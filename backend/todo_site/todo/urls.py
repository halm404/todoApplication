from django.urls import path, include

from .views import lists, list_detail, list_tasks, task_detail, login_user, logout_user, register_user

urlpatterns = [
    path('lists/', lists),
    path('lists/<int:id>/', list_detail),
    path('lists/<int:list_id>/tasks/', list_tasks),
    path('tasks/<int:id>/', task_detail),
    path('login/', login_user),
    path('logout/', logout_user),
    path('register/', register_user),
]