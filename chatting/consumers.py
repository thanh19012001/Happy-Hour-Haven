import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

# In-memory registry: { room_group_name: set of channel_names }
# Ephemeral — lives only as long as the server process.
# When the last user leaves a room, the entry is deleted.
_room_registry: dict[str, set] = {}

MAX_PARTICIPANTS = 2


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Enforce 2-participant limit before accepting the connection
        current_members = _room_registry.get(self.room_group_name, set())
        if len(current_members) >= MAX_PARTICIPANTS:
            await self.close(code=4003)
            return

        # Register this channel in the room
        if self.room_group_name not in _room_registry:
            _room_registry[self.room_group_name] = set()
        _room_registry[self.room_group_name].add(self.channel_name)

        # Join the channel layer group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

        username = (
            self.scope['user'].username
            if self.scope['user'].is_authenticated
            else 'Anonymous'
        )

        # When the seller connects, clean up the ChatRequest row —
        # the knock has been answered, no need to keep it in the DB.
        if len(_room_registry[self.room_group_name]) == MAX_PARTICIPANTS:
            await self.delete_chat_request(self.room_name)

        # Notify room that this user has joined
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': f'{username} has joined the chat.',
                'username': 'System',
            }
        )

    async def disconnect(self, close_code):
        if self.room_group_name in _room_registry:
            _room_registry[self.room_group_name].discard(self.channel_name)

            # Notify remaining participant that the other user left
            if _room_registry[self.room_group_name]:
                username = (
                    self.scope['user'].username
                    if self.scope['user'].is_authenticated
                    else 'Anonymous'
                )
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        'type': 'chat_message',
                        'message': f'{username} has left the chat. The session has ended.',
                        'username': 'System',
                    }
                )

            # Room is empty — clean up entirely (ephemeral: no trace left)
            if not _room_registry[self.room_group_name]:
                del _room_registry[self.room_group_name]

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get('message', '').strip()

        if not message:
            return

        username = (
            self.scope['user'].username
            if self.scope['user'].is_authenticated
            else 'Anonymous'
        )

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'username': username,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'username': event['username'],
        }))

    @database_sync_to_async
    def delete_chat_request(self, room_name):
        """
        Delete the ChatRequest row when both participants are in the room.
        The knock on the door has been answered — no need to persist it.
        Uses database_sync_to_async because Django ORM calls must not
        run on the async event loop directly.
        """
        from .models import ChatRequest
        # room_name here is the raw URL param (e.g. "chat_1_2"),
        # room_id in the DB is stored as "chat_1_2" too.
        ChatRequest.objects.filter(room_id=room_name).delete()
