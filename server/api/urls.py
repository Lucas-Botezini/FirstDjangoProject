from django.urls import path
from . import views

urlpatterns = [
    path("documents", views.DocumentListCreate.as_view(), name="document_list"),
    path("documents/<int:pk>", views.DocumentDelete.as_view(), name="document_delete"),
    path("user/", views.CreateUserView.as_view(), name="user_create"),
]
