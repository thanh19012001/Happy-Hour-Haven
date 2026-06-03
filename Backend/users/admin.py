from django.contrib import admin
from .models import User, LoginLog, PurchaseReceipt

# Register your models here.

#must register all model class so that you can see this on the admin page
admin.site.register(User)


@admin.register(LoginLog)
class LoginLogAdmin(admin.ModelAdmin):
    list_display = ['user', 'timestamp', 'ip_address', 'get_user_email']
    list_filter = ['timestamp', 'user']
    search_fields = ['user__username', 'user__email', 'ip_address']
    readonly_fields = ['timestamp', 'ip_address', 'user_agent', 'user']
    
    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'Email'


@admin.register(PurchaseReceipt)
class PurchaseReceiptAdmin(admin.ModelAdmin):
    list_display = ['user', 'amount', 'status', 'timestamp', 'get_user_email']
    list_filter = ['status', 'timestamp', 'user']
    search_fields = ['user__username', 'user__email', 'items', 'stripe_id']
    readonly_fields = ['timestamp', 'user']
    
    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'Email'
