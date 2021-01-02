from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
  class Meta:
    model = Listing
    fields = ['slug', 'title', 'address', 'city', 'state', 'sale_type', 'price', 'bedrooms', 'bathrooms', 'home_type', 'sqft', 'photo_main']

class ListingDetailSerializer(serializers.ModelSerializer):
  class Meta:
    model = Listing
    fields = '__all__'
    lookup_field = 'slug'