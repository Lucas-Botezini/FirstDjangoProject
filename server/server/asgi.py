import os
from django.core.asgi import get_asgi_application

# Diz qual settings.py será usado
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'server.settings')

# Cria o objeto `application`, que será usado pelo servidor ASGI (ex: Uvicorn, Daphne)
application = get_asgi_application()


# ASGI = Asynchronous Server Gateway Interface.
# É a evolução do WSGI, que além de HTTP também suporta:
# WebSockets (tempo real, chats, notificações push),
# Protocolo assíncrono,
# Melhor performance com asyncio.