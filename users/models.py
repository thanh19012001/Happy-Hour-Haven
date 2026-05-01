from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

#remember to check setting and configure our new user model to be used, we're not using the default User Model provided by django, we're using an abstractone then expanding it
class User(AbstractUser):
    hack_chat_tag = models.CharField(max_length = 255, null = True, blank = True)

class UserInfo(models.Model):
    user = models.OneToOneField('User', on_delete = models.CASCADE) #come back and check this later if something goes wrong
    credit_address = models.CharField(max_length = 255, blank = True, null = True)
    
