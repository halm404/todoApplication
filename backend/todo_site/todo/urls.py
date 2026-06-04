from django.urls import path, include

from .views import task_list, list_collection

urlpatterns = [
    path('tasks/', task_list),
    path('lists/', list_collection),
]