from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import ChatRequest
from .serializers import ChatRequestSerializer

User = get_user_model()

# Set CHAT_HOST in settings.py to change the WebSocket host per environment.
# e.g. CHAT_HOST = "wss://myserver.com"
CHAT_HOST = getattr(settings, 'CHAT_HOST', 'ws://localhost:9000')


class InitiateChatView(APIView):
    """
    Buyer initiates a chat with a seller.
    - Generates a deterministic room ID for the buyer-seller pair.
    - Creates a ChatRequest row so the seller gets notified.
    - If a request already exists for this pair, returns the existing room.
    - Returns the WebSocket URL for the buyer to connect immediately.
    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        seller_id = request.data.get("seller_id")

        if not seller_id:
            return Response(
                {"error": "seller_id is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        buyer = request.user

        # Prevent a user from opening a chat with themselves
        if str(buyer.id) == str(seller_id):
            return Response(
                {"error": "You cannot initiate a chat with yourself"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Verify the seller exists
        try:
            seller = User.objects.get(id=seller_id)
        except User.DoesNotExist:
            return Response(
                {"error": "Seller not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Deterministic room ID — sort IDs so order doesn't matter
        ids = sorted([str(buyer.id), str(seller_id)])
        room_id = f"chat_{ids[0]}_{ids[1]}"

        # Create the ChatRequest if it doesn't already exist
        # (buyer clicking the button twice won't create duplicates)
        ChatRequest.objects.get_or_create(
            room_id=room_id,
            defaults={
                'buyer': buyer,
                'seller': seller,
            }
        )

        room_link = f"{CHAT_HOST}/ws/chat/{room_id}/"

        return Response({
            "detail": "Chat room ready",
            "room_id": room_id,
            "room_link": room_link,
            "buyer": buyer.username,
            "seller": seller.username,
        })


class ChatRequestListView(APIView):
    """
    Seller polls this to see who wants to chat with them.
    GET /chat/requests/
    Returns all pending ChatRequest rows where seller = logged-in user.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        requests = ChatRequest.objects.filter(
            seller=request.user
        ).order_by('-created_at')
        serializer = ChatRequestSerializer(requests, many=True)
        return Response(serializer.data)


class ChatRequestDeleteView(APIView):
    """
    Seller joins or dismisses a chat request.
    DELETE /chat/requests/<room_id>/
    Deletes the ChatRequest row — the knock on the door is answered.
    """
    permission_classes = [IsAuthenticated]

    def delete(self, request, room_id):
        try:
            chat_request = ChatRequest.objects.get(
                room_id=room_id,
                seller=request.user  # seller can only delete their own requests
            )
        except ChatRequest.DoesNotExist:
            return Response(
                {"error": "Chat request not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        chat_request.delete()
        return Response(
            {"detail": "Chat request dismissed"},
            status=status.HTTP_204_NO_CONTENT
        )
