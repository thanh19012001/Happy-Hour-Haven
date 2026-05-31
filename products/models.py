from django.db import models

# Create your models here.


# This method/function is used for the image section of the Product class
# Filename is the jpg/png file being uploaded
# Instance is the product object
    # Since every instance or object of a product has a user id linked to them we can use the user ID as a directory to store our image , it'll look like "user_x"
def user_upload_path(instance, filename):
    return f'products/user_{instance.user.id}/{filename}'

# This is a one to many relationship between Category and Product so we will need to use the "model.Foreign key" to associate between them. 
# ID are autogen and are primary key by default

class Product(models.Model):
    ##Foreign key
    user = models.ForeignKey('users.User', on_delete=models.CASCADE) 
    ##Foreign key
    category = models.ForeignKey('Category', on_delete=models.CASCADE) 

    name = models.CharField(max_length = 255)
    price = models.DecimalField(max_digits=10, decimal_places=2) #money format
    description = models.CharField(max_length=255, blank=True, null=True)
    # date information based on the creation time, still need to format this properly
    date = models.DateTimeField(auto_now_add = True)

    image = models.ImageField(upload_to=user_upload_path, null=True, blank=True)

    #special method that return the string name based on the "name" varibale of the object
    def __str__(self):
        return self.name

class Category(models.Model):
    TypeOfAlcohol = models.CharField(max_length=255)

    #special method that return the string name based on the "TypeOfAlcohol" variable of the object
    def __str__(self):
        return self.TypeOfAlcohol

class Review(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')  # one review per user per product

    def __str__(self):
        return f"{self.user.username} → {self.product.name} ({self.rating}★)"