from django.shortcuts import render
from rest_framework import viewsets
from .models import Cart, Order_Product
from .serializers import CartSerializer, Order_ProductSerializer


# Create your views here.


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class Order_ProductViewSet(viewsets.ModelViewSet):
    queryset = Order_Product.objects.all()
    serializer_class = Order_ProductSerializer