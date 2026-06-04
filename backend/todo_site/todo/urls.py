from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import TaskViewSet, TodoListViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'lists', TodoListViewSet)

urlpatterns = [
    path('', include(router.urls)),
]