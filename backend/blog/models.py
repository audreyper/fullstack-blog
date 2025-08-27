
from django.db import models
from django.contrib.postgres.fields import JSONField  # Optional: for Postgres JSONField, Django 3.1+ has built-in JSONField

# --- Category model ---
class Category(models.Model):
    # Name of the category, must be unique
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        # String representation of the category
        return self.name

# --- Post model ---
class Post(models.Model):
    # Title of the post
    title = models.CharField(max_length=255)

    # Each post belongs to a category, deleting a category deletes related posts
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='posts',
        default=1  # Default category ID if not specified
    )

    # Main image for the post
    main_image = models.ImageField(upload_to='blog_images/')  # Saved in 'media/blog_images/'

    # Optional additional images
    additional_image_1 = models.ImageField(upload_to='blog_images/', blank=True, null=True)
    additional_image_2 = models.ImageField(upload_to='blog_images/', blank=True, null=True)

    # Content stored as JSON (list of sections, paragraphs, or images)
    content = models.JSONField(default=list)

    # Timestamp of when the post was created
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        # String representation of the post
        return self.title