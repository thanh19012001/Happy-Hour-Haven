from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

#remember to check setting and configure our new user model to be used, we're not using the default User Model provided by django, we're using an abstractone then expanding it

def avatar_upload_path(instance, filename):
    return f'avatars/user_{instance.id}/{filename}'

class User(AbstractUser):
    hack_chat_tag = models.CharField(max_length = 255, null = True, blank = True)
    # MFA related column 
    totp_secret = models.CharField(max_length=32, null=True, blank=True)
    mfa_enabled = models.BooleanField(default=False)
    avatar = models.ImageField(upload_to=avatar_upload_path, null=True, blank=True)

class UserInfo(models.Model):
    user = models.OneToOneField('User', on_delete = models.CASCADE) #come back and check this later if something goes wrong
    credit_address = models.CharField(max_length = 255, blank = True, null = True)


class LoginLog(models.Model):
    """Track every login to your website"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='login_logs')
    timestamp = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(null=True, blank=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.user.username} - {self.timestamp}"


class PurchaseReceipt(models.Model):
    """Track all purchases/orders"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='purchase_receipts')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    items = models.TextField(help_text="What items were purchased")
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='completed', choices=[
        ('completed', 'Completed'),
        ('pending', 'Pending'),
        ('refunded', 'Refunded'),
    ])
    stripe_id = models.CharField(max_length=255, null=True, blank=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.user.username} - ${self.amount} - {self.timestamp.strftime('%Y-%m-%d')}"
    
