from django.shortcuts import render
from rest_framework import viewsets

from .models import Task, TodoList
from .serializers import TaskSerializer, TodoListSerializer

class TaskViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TodoListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer