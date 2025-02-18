from django.db import models
from django.contrib.postgres.fields import JSONField

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='posts', default=1)
    main_image = models.ImageField(upload_to='blog_images/')  # Images will be saved in 'media/blog_images/'
    content = models.JSONField(default=list)  # Stores sections, paragraphs, and images in JSON format
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title