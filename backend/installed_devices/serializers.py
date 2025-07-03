from rest_framework import serializers
from .models import InstalledDevice, Device, Customer

class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ['id', 'name', 'type']  # add other fields as needed

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'name']  # add other fields as needed

class InstalledDeviceSerializer(serializers.ModelSerializer):
    device = DeviceSerializer(read_only=True)
    customer = CustomerSerializer(read_only=True)
    
    class Meta:
        model = InstalledDevice
        fields = ['id', 'serial_number', 'installation_date', 'device', 'customer']

