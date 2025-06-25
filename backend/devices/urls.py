from django.urls import path
from .views import DeviceListCreateAPIView, DeviceRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', DeviceListCreateAPIView.as_view(), name='device-list-create'),
    path('<int:pk>/', DeviceRetrieveUpdateDestroyAPIView.as_view(), name='device-detail'),
]
