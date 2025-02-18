
from rest_framework.test import APITestCase
from rest_framework import status
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Category, Post
from .serializers import PostSerializer, CategorySerializer
import os
from django.conf import settings

class CategorySerializerTestCase(APITestCase):
    def setUp(self):
        # Create a category to be used in the post serializer test
        self.category = Category.objects.create(name='Tech')

    def test_category_serializer(self):
        serializer = CategorySerializer(instance=self.category)
        data = serializer.data
        # Ensure the serialized data is correct
        self.assertEqual(data['id'], self.category.id)
        self.assertEqual(data['name'], self.category.name)

class PostSerializerTestCase(APITestCase):
    def setUp(self):
        # Create a category to use in the post
        self.category = Category.objects.create(name='Tech')

        # Specify the path to your existing image within the MEDIA directory
        image_path = os.path.join(settings.BASE_DIR, 'media', 'blog_images', 'test.jpg')

        # Create a SimpleUploadedFile instead of using File
        with open(image_path, 'rb') as img:
            self.image = SimpleUploadedFile('test.jpg', img.read(), content_type='image/jpeg')

        # Create post data, including a valid file for main_image
        self.post_data = {
            'title': 'New Post',
            'category_id': self.category.id,
            'main_image': self.image,  # Use the existing image
            'content': 'This is a test post.',
        }
    
    def test_post_serializer_create(self):
        # Test that post creation works and the serializer maps category correctly
        serializer = PostSerializer(data=self.post_data)
        if not serializer.is_valid():
            print(serializer.errors)  # Print the errors if the serializer is invalid
        self.assertTrue(serializer.is_valid(), serializer.errors)  # Check if the data is valid
        post = serializer.save()  # Save the post
        
        print("Main image path:", post.main_image.name)  # Print out the actual file path
        
        self.assertEqual(post.title, self.post_data['title'])
        self.assertEqual(post.category, self.category)  # Ensure the post's category is set correctly
        
        # Check if part of the filename (e.g., 'test') exists in the saved file name
        self.assertIn('test', post.main_image.name)  # Check if part of the original filename exists

    def test_post_serializer_read(self):
        # Create a post instance
        post = Post.objects.create(
            title='New Post', category=self.category, main_image='image_url', content='Test content'
        )
        serializer = PostSerializer(post)
        data = serializer.data
        # Ensure the post data is correctly serialized
        self.assertEqual(data['id'], post.id)
        self.assertEqual(data['title'], post.title)
        # Check the 'category' field instead of 'category_id'
        self.assertEqual(data['category']['name'], post.category.name)
        self.assertEqual(data['content'], post.content)

    def test_invalid_category_id(self):
        # Test that an invalid category_id gives a validation error
        self.post_data['category_id'] = 999  # Non-existent category
        serializer = PostSerializer(data=self.post_data)
        self.assertFalse(serializer.is_valid())  # Should be invalid
        self.assertIn('category_id', serializer.errors)  # Ensure the error is related to the category_id field




