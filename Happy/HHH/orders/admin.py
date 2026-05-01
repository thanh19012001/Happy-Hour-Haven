from django.contrib import admin
from .models import Order_Product, Cart

# Register your models here.

admin.site.register(Cart)
admin.site.register(Order_Product)
