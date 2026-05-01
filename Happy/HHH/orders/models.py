from django.db import models

# Create your models here.
# This is where all the cart and order stuff is handled from the DB it includes Cart, Order_Product, Payment


# This is a one to many relationship between Cart and users, however user is within another directory so we have to ref the users. (It's called absolute referencing in django) 
# key by default
class Cart(models.Model):
    user = models.ForeignKey('users.User', on_delete = models.CASCADE) # Foreign key (absolute referencing)
    status = models.CharField(max_length = 255)
    date = models.DateTimeField(auto_now_add = True)

class Payment(models.Model):
    order = models.OneToOneField(Cart, on_delete = models.CASCADE)
    amount = models.DecimalField(max_digits = 10, decimal_places = 2)
    status = models.CharField(max_length = 255)
    date = models.DateTimeField(auto_now_add = True)

class Order_Product(models.Model):
    order = models.ForeignKey(Cart, on_delete = models.CASCADE)
    product = models.ForeignKey('products.Product', on_delete = models.CASCADE) # Foreign key (absolute referencing)
    price = models.DecimalField(max_digits = 10, decimal_places = 2)
    quantity = models.PositiveIntegerField() #our quantity is always positive 
