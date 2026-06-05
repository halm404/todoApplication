from django.contrib import admin
from .models import TodoList, Task

admin.site.register(TodoList)
admin.site.register(Task)