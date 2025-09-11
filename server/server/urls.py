from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),   # Painel administrativo do Django
    path("api/user/register/", CreateUserView.as_view(), name="register"),  # Endpoint para registrar usuário
    path("login/", TokenObtainPairView.as_view(), name="get_token"),  # Login via JWT (gera access e refresh token)
    path("login/refresh", TokenRefreshView.as_view(), name="refresh"),  # Atualizar o access token usando o refresh
    path("api-auth/", include("rest_framework.urls")),  # Login/logout da interface do Django REST Framework
    path("", include("api.urls")),  # Inclui rotas adicionais definidas no app "api"
]

# Esse arquivo é responsável pelo roteamento de URLs no Django → ou seja, ele define quais endereços da sua aplicação chamam quais funções/views.