from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    pass

class UserInfo(models.Model):
    user = models.OneToOneField('User', on_delete=models.CASCADE) #come back and check this later if something goes wrong
    credit_address = models.CharField(max_length=255, blank=True, null=True)
