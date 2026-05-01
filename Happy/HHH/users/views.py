from django.shortcuts import render

from rest_framework import generics
from .serializers import RegisterSerializer, SellerSerializer
from rest_framework import viewsets
from django.contrib.auth import get_user_model


# Create your views here.
User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    

class SellerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = SellerSerializer