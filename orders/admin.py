from django.contrib import admin
from .models import Order_Product, Cart

# Register your models here.

#must register all model class so that you can see this on the admin page
admin.site.register(Cart)
admin.site.register(Order_Product)
