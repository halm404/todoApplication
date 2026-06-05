from .models import Task, TodoList
from .serializers import TaskSerializer, TodoListSerializer

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view


# GET all lists or create list
@api_view(['GET', 'POST'])
def lists(request):

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

# GET list by id, update list by id, or delete list by id
@api_view(['GET', 'PUT', 'DELETE'])
def list_detail(request, id):

    try:
        todo_list = TodoList.objects.get(id=id)
    except TodoList.DoesNotExist:
        return Response(
            {"error": "List not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        serializer = TodoListSerializer(todo_list)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TodoListSerializer(
            todo_list,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == 'DELETE':
        todo_list.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)



# GET tasks from a list or create new task
@api_view(['GET', 'POST'])
def list_tasks(request, list_id):

    try:
        todo_list = TodoList.objects.get(id=list_id)
    except TodoList.DoesNotExist:
        return Response(
            {"error": "List not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        tasks = Task.objects.filter(todo_list=todo_list)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        data = request.data.copy()
        data['todo_list'] = todo_list.id

        serializer = TaskSerializer(data=data)

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

# GET task by id, update task by id, or delete task by id
@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, id):

    try:
        task = Task.objects.get(id=id)
    except Task.DoesNotExist:
        return Response(
            {"error": "Task not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == 'GET':
        serializer = TaskSerializer(task)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = TaskSerializer(
            task,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == 'DELETE':
        task.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

# Authorization of user
@api_view(['POST'])
def login_user(request):

    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:
        return Response(
            {
                "message": "Login successful",
                "user_id": user.id,
                "username": user.username
            },
            status=status.HTTP_200_OK
        )

    return Response(
        {
            "error": "Invalid username or password"
        },
        status=status.HTTP_401_UNAUTHORIZED
    )

# Registration of user
@api_view(['POST'])
def register_user(request):

    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response(
            {"error": "All fields are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Username already exists"},
            status=status.HTTP_400_BAD_REQUEST
        )

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password
    )

    return Response(
        {
            "message": "User created successfully",
            "user_id": user.id,
            "username": user.username
        },
        status=status.HTTP_201_CREATED
    )