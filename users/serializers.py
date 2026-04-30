# users/serializers.py
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User, UserInfo

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class SellerSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField()
    date_joined = serializers.DateTimeField(format="%d-%m-%Y")

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar', 'date_joined','hack_chat_tag']
    
    def get_avatar(self, obj):
        return f"https://i.pravatar.cc/150?u={obj.username}"