from django.db import models
from django.conf import settings

class TodoList(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='lists'
    )


class Task(models.Model):
    title = models.CharField(max_length=255)
    deadline = models.DateTimeField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    todo_list = models.ForeignKey(
        TodoList,
        on_delete=models.CASCADE,
        related_name='tasks',
        default=''
    )

    def __str__(self):
        return self.title

