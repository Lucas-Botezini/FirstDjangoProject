import os
from django.core.wsgi import get_wsgi_application

# Define o módulo de configurações do Django que será usado
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

# Cria a aplicação WSGI (um objeto chamável que o servidor entende)
application = get_wsgi_application()


# WSGI significa Web Server Gateway Interface.
# É um padrão de comunicação entre servidores web (ex: Apache, Nginx + Gunicorn/uWSGI) e aplicações Python (no caso, seu projeto Django).
# Ele funciona como uma ponte: o servidor web recebe a requisição HTTP e a repassa para o Django via WSGI; depois o Django devolve a resposta pelo mesmo caminho.