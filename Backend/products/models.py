from django.db import models

# Create your models here.

# This is a one to many relationship between Category and Product so we will need to use the model.foreign key to associate between them. ID are autogen and are primary 
# key by default
class Product(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE) ##Foreign key
    category = models.ForeignKey('Category', on_delete=models.CASCADE) ##Foreign key
    name = models.CharField(max_length = 255)
    price = models.DecimalField(max_digits=10, decimal_places=2) #money format
    description = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateTimeField(auto_now_add = True)# date information based on the creation time, still need to format this properly
    place_holder_image = models.CharField(max_length = 255, null = True, blank = True)# will be deleted later because we're using links from other site instead of having our own image

    #special method that return the string name based on the "name" varibale of the object
    def __str__(self):
        return self.name

class ProductImage(models.Model): #this class currently is not being used but is within the database 
    image = models.ImageField(upload_to='products/')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

class Category(models.Model):
    TypeOfAlcohol = models.CharField(max_length=255)

    #special method that return the string name based on the "TypeOfAlcohol" variable of the object
    def __str__(self):
        return self.TypeOfAlcohol
