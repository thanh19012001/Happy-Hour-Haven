from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Cart, Order_Product, Payment
from .serializers import CartSerializer, Order_ProductSerializer
from products.models import Product

# Basic viewsets (kept as is)
class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

class Order_ProductViewSet(viewsets.ModelViewSet):
    queryset = Order_Product.objects.all()
    serializer_class = Order_ProductSerializer

# --- CART LOGIC ---

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity", 1)

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        cart, created = Cart.objects.get_or_create(
            user=request.user,
            status="pending"
        )

        order_product, item_created = Order_Product.objects.get_or_create(
            order=cart,
            product=product,
            defaults={"price": product.price, "quantity": quantity}
        )

        if not item_created:
            order_product.quantity += int(quantity)
            order_product.save()

        return Response({
            "detail": "Item added to cart",
            "cart_id": cart.id,
            "product": product.name,
            "quantity": order_product.quantity
        })


class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            cart = Cart.objects.get(user=request.user, status="pending")
        except Cart.DoesNotExist:
            return Response({"error": "No active cart found"}, status=status.HTTP_404_NOT_FOUND)

        items = Order_Product.objects.filter(order=cart)
        total = sum(item.price * item.quantity for item in items)

        cart.status = "paid"
        cart.save()

        Payment.objects.create(
            order=cart,
            amount=total,
            status="completed"
        )

        return Response({
            "detail": "Checkout successful",
            "cart_id": cart.id,
            "amount_paid": total
        })