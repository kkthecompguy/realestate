from django.urls import path
from .views import RealtorListView, RealtorDetailView, TopSellerListView

urlpatterns =  [
  path('', RealtorListView.as_view(), name='realtors'),
  path('top-sellers/', TopSellerListView.as_view(), name='top-sellers'),
  path('<str:pk>/', RealtorDetailView.as_view(), name='realtors-detail'),
]