from django.urls import re_path
from . import consumers

# url for websocket uses the room name and passes it to consumer.py for connection 
# essentially it gets the "chat_x_x" from the url of your browser and sends it to consumer.py
websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer.as_asgi()),
]