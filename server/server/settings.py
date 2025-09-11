"""
Django settings for server project.

Gerado automaticamente pelo 'django-admin startproject' usando Django 5.2.5.
Este arquivo contém as configurações principais do seu projeto.
"""

from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv
import os

# Carrega variáveis de ambiente do arquivo .env
load_dotenv()

# Caminho base do projeto (pasta principal)
BASE_DIR = Path(__file__).resolve().parent.parent


# ============================
# CONFIGURAÇÕES DE SEGURANÇA
# ============================

# Chave secreta usada para criptografia (NUNCA expor em produção!)
SECRET_KEY = 'django-insecure-(&ad6pdpy%zd)tlj%hbhf8s%@!#b8nfe9e!g$c&n@ww)*rlq_4'

# Modo debug (ativar apenas em desenvolvimento!)
DEBUG = True

# Lista de domínios/hosts permitidos a acessar a aplicação
ALLOWED_HOSTS = ["*"]


# ============================
# DJANGO REST FRAMEWORK + JWT
# ============================

REST_FRAMEWORK = {
    # Define que a autenticação padrão será via JWT
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    # Permissão padrão: usuário precisa estar autenticado
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
}

# Configuração dos tokens JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),  # Duração do access token
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),     # Duração do refresh token
}


# ============================
# APLICAÇÕES INSTALADAS
# ============================

INSTALLED_APPS = [
    "django.contrib.admin",          # Painel administrativo
    "django.contrib.auth",           # Autenticação de usuários
    "django.contrib.contenttypes",   # Permite relacionar modelos
    "django.contrib.sessions",       # Sessões de usuários
    "django.contrib.messages",       # Sistema de mensagens
    "django.contrib.staticfiles",    # Arquivos estáticos (CSS, JS, imagens)

    # Apps criados no projeto
    "api",

    # Bibliotecas externas
    "rest_framework",
    "corsheaders",   # Para habilitar CORS (acesso de front-ends externos)
]


# ============================
# MIDDLEWARES
# ============================

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",

    # Middleware do CORS
    "corsheaders.middleware.CorsMiddleware",
]


# ============================
# URLS E WSGI
# ============================

ROOT_URLCONF = 'server.urls'

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Pasta extra para armazenar templates (opcional)
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# Arquivo principal de interface WSGI (produção)
WSGI_APPLICATION = 'server.wsgi.application'


# ============================
# BANCO DE DADOS
# ============================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',  # Banco padrão do Django
        'NAME': BASE_DIR / 'db.sqlite3',         # Arquivo SQLite local
    }
}


# ============================
# VALIDAÇÕES DE SENHA
# ============================

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# ============================
# INTERNACIONALIZAÇÃO
# ============================

# Idioma padrão
LANGUAGE_CODE = 'en-us'

# Fuso horário (🇧🇷 Brasil → São Paulo)
# 🔑 Se quiser que horários fiquem no fuso de Brasília, use:
TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True  # Tradução/mensagens internacionais
USE_TZ = True    # Usa sistema de fuso horário (UTC por padrão)


# ============================
# ARQUIVOS ESTÁTICOS
# ============================

# Caminho dos arquivos estáticos (CSS, JS, imagens)
STATIC_URL = 'static/'


# ============================
# CONFIGURAÇÕES ADICIONAIS
# ============================

# Tipo padrão de chave primária nos modelos
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Permite que qualquer origem acesse a API (⚠ cuidado em produção)
CORS_ALLOW_ALL_ORIGINS = True

# Corrigindo erro de credenciais no CORS
CORS_ALLOW_CREDENTIALS = True
