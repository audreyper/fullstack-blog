from rest_framework import serializers
from .models import Category, Post

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class PostSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), write_only=True
    )

    class Meta:
        model = Post
        fields = ['id', 'title', 'category', 'category_id', 'main_image', 'content', 'created_at']

    def create(self, validated_data):
        category = validated_data.pop('category_id')
        post = Post.objects.create(category=category, **validated_data)
        return post