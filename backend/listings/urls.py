from django.urls import path
from .views import ListingsView, ListingView, SearchView

urlpatterns = [
  path('', ListingsView.as_view(), name='listings'),
  path('search/', SearchView.as_view(), name='search-listing'),
  path('<str:slug>/', ListingView.as_view(), name='listing'),
]