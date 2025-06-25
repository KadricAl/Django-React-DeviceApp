from rest_framework import generics
from .models import InstalledDevice
from .serializers import InstalledDeviceSerializer
from django_filters.rest_framework import DjangoFilterBackend

class InstalledDeviceListCreateAPIView(generics.ListCreateAPIView):
    queryset = InstalledDevice.objects.all()
    serializer_class = InstalledDeviceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['customer', 'device']
    ordering_fields = ['installation_date']
    search_fields = ['serial_number']

class InstalledDeviceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = InstalledDevice.objects.all()
    serializer_class = InstalledDeviceSerializer

