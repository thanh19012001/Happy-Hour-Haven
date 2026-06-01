from django.contrib import admin
from .models import Product, Category, Review

# Register your models here.

#must register all model class so that you can see this on the admin page
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Review)
