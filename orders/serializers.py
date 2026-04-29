from rest_framework import serializers
from .models import Cart, Order_Product

class Order_ProductSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='products.name', read_only=True)

    class Meta:
        model = Order_Product
        fields = ['id', 'product', 'product_name', 'quantity', 'price']

class CartSerializer(serializers.ModelSerializer):
    items = Order_ProductSerializer(many=True, read_only=True, source='Order_Product_set')

    class Meta:
        model = Cart
        fields = ['id', 'status', 'items']