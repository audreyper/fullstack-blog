
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, PostViewSet, contact  

# --- Router for DRF ViewSets ---
router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')  # /api/categories/
router.register(r'posts', PostViewSet, basename='post')    # /api/posts/


# --- URL patterns ---
urlpatterns = [
    path('api/', include(router.urls)),  # Include all ViewSet routes under /api/
    path('api/contact/', contact, name='contact'),  # Endpoint for contact form submissions
]