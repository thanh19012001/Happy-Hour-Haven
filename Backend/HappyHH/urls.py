"""
URL configuration for HappyHH project.
"""
from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.routers import DefaultRouter

from products.views import ProductViewSet, CategoryViewSet, ReviewView
from orders.views import CartViewSet, Order_ProductViewSet, AddToCartView, CheckoutView
from users.views import RegisterView, SellerViewSet, DeleteAccountView, MFASetupView, MFAVerifyEnableView, MFAEnforcedLoginView, UserProfileView
from chatting.views import InitiateChatView, ChatRequestListView, ChatRequestDeleteView

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

    # MFA
    path('mfa/setup/', MFASetupView.as_view()),
    path('mfa/enable/', MFAVerifyEnableView.as_view()),
    path('login/', MFAEnforcedLoginView.as_view()),

    path('delete-account/', DeleteAccountView.as_view()),

    # Chat — buyer initiates
    path('chat/initiate/', InitiateChatView.as_view()),

    # Chat — seller polls for pending requests
    path('chat/requests/', ChatRequestListView.as_view()),

    # Chat — seller joins or dismisses a specific request
    path('chat/requests/<str:room_id>/', ChatRequestDeleteView.as_view()),

    # Reviews
    path('products/<int:product_id>/reviews/', ReviewView.as_view()),

    # Orders
    path('cart/add/', AddToCartView.as_view()),
    path('cart/checkout/', CheckoutView.as_view()),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) \
  + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
