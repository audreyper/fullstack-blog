
from django.apps import AppConfig

# --- Configuration for the 'blog' app ---

class BlogConfig(AppConfig):
    # Sets the default type of primary key field for models in this app
    default_auto_field = 'django.db.models.BigAutoField'
    
    # Name of the Django app
    name = 'blog'