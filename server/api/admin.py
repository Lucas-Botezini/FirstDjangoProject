from django.contrib import admin
from .models import Document

# Register your models here.

admin.site.register(Document)

# É o arquivo onde você registra os modelos (models) do app no painel administrativo do Django.

# Assim, eles aparecem no /admin/ para serem gerenciados.