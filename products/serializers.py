from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source = 'category.TypeOfAlcohol', read_only = True)
    sellerId = serializers.IntegerField(source = 'user.id', read_only = True)
    seller_name = serializers.CharField(source = 'user.username', read_only = True)

    class Meta:
        model = Product
        fields = ['id', 'sellerId', 'seller_name' ,'name', 'price', 'date' ,'category','category_name', 'description']