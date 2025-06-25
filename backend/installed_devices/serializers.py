from rest_framework import serializers
from .models import InstalledDevice

class InstalledDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstalledDevice
        fields = '__all__'
