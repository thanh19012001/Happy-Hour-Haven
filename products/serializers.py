from rest_framework import serializers
from .models import Product, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source = 'category.TypeOfAlcohol', read_only = True) #had to rechange the name to category_name cuz the model name is TypeOfAlcohol
    sellerId = serializers.IntegerField(source = 'user.id', read_only = True) #getting seller ID so that product is linked to seller
    seller_name = serializers.CharField(source = 'user.username', read_only = True) #getting seller name so that product can display the name of the owner

    class Meta:
        model = Product
        fields = ['id', 'sellerId', 'seller_name' ,'name', 'price', 'date' ,'category','category_name', 'description', 'place_holder_image']