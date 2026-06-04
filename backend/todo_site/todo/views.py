from django.shortcuts import render

from .models import Task, TodoList
from .serializers import TaskSerializer, TodoListSerializer

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view


class TaskViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TodoListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer

# API for tasks
@api_view(['GET', 'POST'])
def task_list(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

# API for lists
@api_view(['GET', 'POST'])
def list_collection(request):
    if request.method == 'GET':
        lists = TodoList.objects.all()
        serializer = TodoListSerializer(lists, many=True)

        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TodoListSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )