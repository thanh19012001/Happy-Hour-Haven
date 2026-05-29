from django.shortcuts import render
from .serializers import RegisterSerializer, SellerSerializer, MFALoginSerializer
from django.contrib.auth import get_user_model, logout

from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

import pyotp

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        user = request.user
        logout(request)
        user.delete()
        return Response({"detail": "Account deleted successfully"})


class SellerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = SellerSerializer


# --- MFA VIEWS ---

class MFASetupView(APIView):
    # Step 1: Generate a secret and return a QR code URL for the user to scan 
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        if not user.totp_secret:
            user.totp_secret = pyotp.random_base32()
            user.save()
        
        totp = pyotp.TOTP(user.totp_secret)
        uri = totp.provisioning_uri(name=user.username, issuer_name="HappyHourHaven")
        
        return Response({
            "secret": user.totp_secret,
            "uri": uri  # frontend feeds this into a QR code library
        })


class MFAVerifyEnableView(APIView):
    # Step 2: User scans QR, types in the 6-digit code, we verify and enable MFA
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        code = request.data.get("code")

        if not user.totp_secret:
            return Response({"error": "MFA setup not started"}, status=status.HTTP_400_BAD_REQUEST)

        totp = pyotp.TOTP(user.totp_secret)

        if totp.verify(code):
            user.mfa_enabled = True
            user.save()
            return Response({"detail": "MFA enabled successfully"})
        else:
            return Response({"error": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)


class MFALoginVerifyView(APIView):
    # Step 3: After normal JWT login, if MFA is on, verify the code before granting access
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        code = request.data.get("code")

        if not user.mfa_enabled:
            return Response({"detail": "MFA not enabled for this account"})

        totp = pyotp.TOTP(user.totp_secret)

        if totp.verify(code):
            return Response({"detail": "MFA verified, access granted"})
        else:
            return Response({"error": "Invalid code"}, status=status.HTTP_400_BAD_REQUEST)
        


class MFAEnforcedLoginView(APIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = MFALoginSerializer

    def post(self, request):
        serializer = MFALoginSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Step 1: validate username and password
        token_serializer = TokenObtainPairSerializer(data=request.data)
        
        try:
            token_serializer.is_valid(raise_exception=True)
        except Exception:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)

        user = token_serializer.user

        # Step 2: if MFA enabled, check code
        if user.mfa_enabled:
            code = serializer.validated_data.get("code")

            if not code:
                return Response({
                    "mfa_required": True,
                    "detail": "Please provide your MFA code"
                }, status=status.HTTP_403_FORBIDDEN)

            totp = pyotp.TOTP(user.totp_secret)
            if not totp.verify(code):
                return Response({"error": "Invalid MFA code"}, status=status.HTTP_401_UNAUTHORIZED)

        # Step 3: return token
        return Response(token_serializer.validated_data)