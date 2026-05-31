import uuid
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class InitiateChatView(APIView):
    # Buyer initiates chat with seller — generates a unique room per buyer-seller pair
    
    # Only logged in user can use this
    permission_classes = [IsAuthenticated]

    # buyer sends a post request to get the seller ID, it will be used to make a unique room 
    def post(self, request):
        # returns a number 
        seller_id = request.data.get("seller_id")

        # Get the seller (as in the object of this seller from the DB)
        try:
            seller = User.objects.get(id=seller_id)
        except User.DoesNotExist:
            return Response({"error": "Seller not found"}, status=status.HTTP_404_NOT_FOUND)

        buyer = request.user

        # Generate room ID based on buyer and seller IDs
        # Same buyer + seller always gets the same room
        room_id = f"chat_{buyer.id}_{seller_id}"

        # Build the room link
        # May switch this to some other port depending on who host this.
        room_link = f"ws://localhost:9000/ws/chat/{room_id}/"

        return Response({
            "detail": "Chat room ready",
            "room_id": room_id,
            "room_link": room_link,
            "buyer": buyer.username,
            "seller": seller.username
        })