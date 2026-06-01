from django.shortcuts import render
from rest_framework import viewsets
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
# Create your views here.

# Using viewset for crud operation (from django rest framework)
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

from .models import Product, Category, Review
from orders.models import Order_Product

class ReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, product_id):
        # Anyone can see reviews
        reviews = Review.objects.filter(product_id=product_id)
        data = [
            {
                "id": r.id,
                "user": r.user.username,
                "rating": r.rating,
                "comment": r.comment,
                "date": r.date.strftime("%d-%m-%Y")
            }
            for r in reviews
        ]
        return Response(data)

    def post(self, request, product_id):
        # Only buyers can leave a review
        user = request.user

        # Check if product exists
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # Check if already reviewed
        if Review.objects.filter(user=user, product=product).exists():
            return Response({"error": "You have already reviewed this product"}, status=status.HTTP_400_BAD_REQUEST)

        # Validate rating
        rating = request.data.get("rating")
        comment = request.data.get("comment", "")

        if not rating or int(rating) not in range(1, 6):
            return Response({"error": "Rating must be between 1 and 5"}, status=status.HTTP_400_BAD_REQUEST)

        review = Review.objects.create(
            user=user,
            product=product,
            rating=int(rating),
            comment=comment
        )

        return Response({
            "detail": "Review submitted successfully",
            "rating": review.rating,
            "comment": review.comment
        })