from django.urls import path, include

from .views import tasks, lists, list_detail

urlpatterns = [
    path('tasks/', tasks),
    path('lists/', lists),
    path('list/<int:id>', list_detail),
]