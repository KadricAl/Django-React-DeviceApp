from django.db import models
from installed_devices.models import InstalledDevice

class Service(models.Model):
    SERVICE_TYPES = [
        ('request', 'Request'),
        ('maintenance', 'Maintenance'),
        ('yearly', 'Yearly'),
        ('none', 'None'),
    ]

    type = models.CharField(max_length=20, choices=SERVICE_TYPES, default='none')
    installed_device = models.ForeignKey(InstalledDevice, on_delete=models.CASCADE, related_name='services')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    def __str__(self):
        return f"{self.type.title()} Service for {self.installed_device.serial_number}"
