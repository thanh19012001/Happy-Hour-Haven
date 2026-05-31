"""
URL configuration for HappyHH project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

#package from jwt for authentication
from rest_framework_simplejwt.views import TokenObtainPairView

#viewset and default router that will be used with viewset
from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet, CategoryViewSet
from orders.views import CartViewSet, Order_ProductViewSet
from users.views import RegisterView, SellerViewSet, DeleteAccountView,  MFASetupView, MFAVerifyEnableView, MFAEnforcedLoginView, UserProfileView 
from chatting.views import InitiateChatView

from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()
router.register('products', ProductViewSet)
router.register('categories', CategoryViewSet)
router.register('cart', CartViewSet)
router.register('order_product', Order_ProductViewSet)
router.register('sellers', SellerViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('register/', RegisterView.as_view()),

    path('user/me/', UserProfileView.as_view()),

    # Setup MFA (generate QR code and the secret code)
    path('mfa/setup/', MFASetupView.as_view()),
    # Use the what generated to enable the MFA 
    path('mfa/enable/', MFAVerifyEnableView.as_view()),

    # New login, this one uses MFA. If MFA is enabled, they must pass the MFA TOTP first.
    path('login/', MFAEnforcedLoginView.as_view()),

    #API for deleting account, please use this for account deletion
    path('delete-account/', DeleteAccountView.as_view()),

    #check readme, this is too complicated
    path('chat/initiate/', InitiateChatView.as_view()),

    # Since we're using Daphne we need to use this line of code to server static files and media. 
    # If this was a normal server run we would've not need for this
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)