from rest_framework import serializers
from .models import InstalledDevice, Device, Customer
from devices.serializers import DeviceSerializer
from customers.serializers import CustomerSerializer

class InstalledDeviceSerializer(serializers.ModelSerializer):
    device = DeviceSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)

    device_id = serializers.PrimaryKeyRelatedField(
        queryset=Device.objects.all(),
        source='device',
        write_only=True
    )
    customer_id = serializers.PrimaryKeyRelatedField(
        queryset=Customer.objects.all(),
        source='customer',
        write_only=True
    )

    class Meta:
        model = InstalledDevice
        fields = [
            'id', 'serial_number', 'installation_date',
            'device', 'customer', 'device_id', 'customer_id'
        ]

