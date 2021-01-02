from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions
from .serializers import RealtorSerializer
from .models import Realtor

# Create your views here.
class RealtorListView(ListAPIView):
  permission_classes = [permissions.AllowAny,]
  queryset = Realtor.objects.all()
  serializer_class = RealtorSerializer
  pagination_class = None


class RealtorDetailView(RetrieveAPIView):
  queryset = Realtor.objects.all()
  serializer_class = RealtorSerializer


class TopSellerListView(ListAPIView):
  permission_classes = [permissions.AllowAny, ]
  queryset = Realtor.objects.filter(top_seller=True)
  serializer_class = RealtorSerializer
  pagination_class = None