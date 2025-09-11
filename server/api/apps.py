from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

# name = 'api' → nome do app.
# default_auto_field → define o tipo padrão de chave primária nos models (nesse caso BigAutoField, que gera IDs grandes automaticamente).


# Define a configuração principal do app.
# O Django usa essa classe para identificar o app (api) dentro do projeto.
