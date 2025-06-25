from django.urls import path
from .views import InstalledDeviceListCreateAPIView, InstalledDeviceRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('', InstalledDeviceListCreateAPIView.as_view(), name='installeddevice-list-create'),
    path('<int:pk>/', InstalledDeviceRetrieveUpdateDestroyAPIView.as_view(), name='installeddevice-detail'),
]
