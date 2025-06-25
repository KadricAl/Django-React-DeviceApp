from rest_framework import generics
from .models import Device
from .serializers import DeviceSerializer
from django_filters.rest_framework import DjangoFilterBackend

class DeviceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['brand', 'type']
    search_fields = ['name', 'type', 'brand']

class DeviceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

