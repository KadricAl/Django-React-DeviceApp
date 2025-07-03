from rest_framework import serializers
from .models import Service
from installed_devices.models import InstalledDevice
from installed_devices.serializers import  InstalledDeviceSerializer

class ServiceSerializer(serializers.ModelSerializer):
    installed_device = InstalledDeviceSerializer(read_only=True)
    installed_device_id = serializers.PrimaryKeyRelatedField(
        queryset=InstalledDevice.objects.all(),
        source='installed_device',
        write_only=True
    )

    class Meta:
        model = Service
        fields = ['id', 'type', 'installed_device', 'installed_device_id', 'start_date', 'end_date', 'description', 'price']

