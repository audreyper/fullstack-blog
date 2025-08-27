
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Category, Post
from .serializers import CategorySerializer, PostSerializer
import os
import requests
import re

# --- ViewSets for models ---

class CategoryViewSet(viewsets.ModelViewSet):
    """ViewSet for Category model"""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PostViewSet(viewsets.ModelViewSet):
    """ViewSet for Post model"""
    queryset = Post.objects.all()
    serializer_class = PostSerializer

# --- Contact form API ---

@api_view(['POST'])
def contact(request):
    data = request.data
    name = data.get('user_name')
    email = data.get('user_email')
    message = data.get('message')

    # Basic validation: all fields are required
    if not name or not email or not message:
        return Response({'success': False, 'error': 'All fields are required'}, status=400)

    # Validate email format using regex
    email_regex = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    if not re.match(email_regex, email):
        return Response({'success': False, 'error': 'Invalid email format'}, status=400)

    # Replace newlines with <br/> for HTML email
    html_message = message.replace('\n', '<br/>')
 
    # Prepare payload for Resend API
    payload = {
      "from": os.environ.get('RESEND_FROM'),   # sender email from environment
      "to": [os.environ.get('RESEND_TO')],     # recipient email from environment
      "subject": f"New contact form message from {name}",
      "text": f"From: {name} <{email}>\n\n{message}",       # plain text version
      "html": f"<p><strong>From:</strong> {name} ({email})</p><p>{html_message}</p>"  # HTML version
}
    # Set headers with API key for authorization
    headers = {
        "Authorization": f"Bearer {os.environ.get('RESEND_API_KEY')}",
        "Content-Type": "application/json"
    }

    try:
         # Send email via Resend API
        resp = requests.post("https://api.resend.com/emails", json=payload, headers=headers)
        resp.raise_for_status()   # Raise exception if request failed
        return Response({'success': True})
    except requests.RequestException as e:
         # Return error response if sending fails
        return Response({'success': False, 'error': str(e)}, status=500)