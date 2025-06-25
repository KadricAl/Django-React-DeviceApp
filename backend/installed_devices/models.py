from django.db import models
from devices.models import Device
from customers.models import Customer

class InstalledDevice(models.Model):
    serial_number = models.CharField(max_length=100, unique=True)
    installation_date = models.DateField()
    device = models.ForeignKey(Device, on_delete=models.CASCADE, related_name='installed_devices')
    # Temporary placeholder for customer (to be updated later)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='installed_devices')

    def __str__(self):
        return f"{self.serial_number} - {self.device.name}"

