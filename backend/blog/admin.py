
from django.contrib import admin
from .models import Category, Post

# --- Registering models with the Django admin site ---

# Register Category model so you can manage categories in the admin interface
admin.site.register(Category)

# Register Post model so you can manage blog posts in the admin interface
admin.site.register(Post)