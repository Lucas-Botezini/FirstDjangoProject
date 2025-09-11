#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()

# Script usado para rodar e gerenciar o projeto no django
# Ele define a variável de ambiente DJANGO_SETTINGS_MODULE, apontando para o arquivo de configurações do projeto. (server.settings.py)

# Alguns comandos que são utilizados com ele
    # python manage.py runserver   # inicia o server
    # python manage.py makemigrations   # cria migrações do banco
    # python manage.py migrate   # aplica migrações no banco
    # python manage.py createsuperuser   # cria usuário administrador

