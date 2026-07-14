from django.urls import path, include

from rest_framework_simplejwt.views import TokenRefreshView

from .views import lists, list_detail, list_tasks, task_detail, login_user, register_user

urlpatterns = [
    path("login/", login_user),
    path("register/", register_user),
    path("lists/", lists),
    path("lists/<int:id>/", list_detail),
    path("lists/<int:list_id>/tasks/", list_tasks),
    path("tasks/<int:id>/", task_detail),
    path("token/refresh/", TokenRefreshView.as_view()),
]