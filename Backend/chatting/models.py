from django.db import models
from django.conf import settings


class ChatRequest(models.Model):
    """
    Ephemeral knock-on-the-door record.
    Created when a buyer initiates a chat.
    Deleted when the seller joins or dismisses.
    Messages are NEVER stored — they flow through the channel layer only.
    """
    room_id = models.CharField(max_length=100, unique=True)
    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='chat_requests_sent',
        on_delete=models.CASCADE
    )
    seller = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='chat_requests_received',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"ChatRequest: {self.buyer.username} → {self.seller.username} (room: {self.room_id})"
