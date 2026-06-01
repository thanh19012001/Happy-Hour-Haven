from rest_framework import serializers
from .models import ChatRequest


class ChatRequestSerializer(serializers.ModelSerializer):
    buyer = serializers.StringRelatedField()   # returns username
    seller = serializers.StringRelatedField()  # returns username

    class Meta:
        model = ChatRequest
        fields = ['room_id', 'buyer', 'seller', 'created_at']
