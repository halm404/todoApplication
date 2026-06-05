from django.urls import path, include

from .views import lists, list_detail, list_tasks, task_detail

urlpatterns = [
    path('lists/', lists),
    path('lists/<int:id>/', list_detail),
    path('lists/<int:list_id>/tasks/', list_tasks),
    path('tasks/<int:id>/', task_detail),
]