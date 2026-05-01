from django.contrib import admin
from .models import User

# Register your models here.

#must register all model class so that you can see this on the admin page
admin.site.register(User)

