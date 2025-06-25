from rest_framework import generics
from .models import Customer
from .serializers import CustomerSerializer
from django_filters.rest_framework import DjangoFilterBackend

class CustomerListCreateAPIView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['address']
    ordering_fields = ['name']
    search_fields = ['name']

class CustomerRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

