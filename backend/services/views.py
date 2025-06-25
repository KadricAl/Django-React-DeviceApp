from rest_framework import generics
from .models import Service
from .serializers import ServiceSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ServiceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['type', 'installed_device']
    ordering_fields = ['end_date']
    search_fields = ['description']

class ServiceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

