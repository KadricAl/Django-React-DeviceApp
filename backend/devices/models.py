from django.db import models

class Device(models.Model):
    name = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    picture_url = models.URLField(blank=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.name} - ({self.type})"
