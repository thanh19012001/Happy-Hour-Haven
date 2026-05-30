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
from users.views import RegisterView, SellerViewSet, DeleteAccountView,  MFASetupView, MFAVerifyEnableView, MFALoginVerifyView, MFAEnforcedLoginView

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
    path('login/', MFAEnforcedLoginView.as_view()),

    path('mfa/setup/', MFASetupView.as_view()),
    path('mfa/enable/', MFAVerifyEnableView.as_view()),
    path('mfa/verify/', MFALoginVerifyView.as_view()),

    path('delete-account/', DeleteAccountView.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)