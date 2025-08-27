
from rest_framework import serializers
from .models import Category, Post

# --- Serializer for Category model ---
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']  # Expose the category ID and name

# --- Serializer for Post model ---
class PostSerializer(serializers.ModelSerializer):
    # Nested read-only serializer to show category details in the post output
    category = CategorySerializer(read_only=True)

    # Write-only field for setting category by ID when creating/updating a post
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),  # Only allow existing categories
        write_only=True
    )

    class Meta:
        model = Post
        fields = [
            'id', 'title', 'category', 'category_id', 
            'main_image', 'additional_image_1', 'additional_image_2',
            'content', 'created_at'
        ]  # Include all relevant fields

    def create(self, validated_data):
        """
        Custom create method to handle category assignment via category_id.
        Extracts the category object and creates the Post with it.
        """
        category = validated_data.pop('category_id')
        post = Post.objects.create(category=category, **validated_data)
        return post