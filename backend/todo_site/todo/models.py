from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(default='')
    deadline = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, default='')

    def __str__(self):
        return self.title