from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Document, UserClient

# Serializers transformam objetos Python/Django (models) em JSON (e vice-versa) para APIs.

class UserSerializer(serializers.ModelSerializer):
    securitylevel = serializers.IntegerField(write_only=True) # usado apenas na criação

    class Meta:
            model = User
            fields = ["id", "username", "password", "securitylevel"]
            extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        # Extrai o campo securitylevel dos dados validados
        securitylevel = validated_data.pop("securitylevel")

        # Cria o usuário com os dados restantes
        user = User.objects.create_user(**validated_data)

        # Cria o UserClient associado ao usuário com o securitylevel fornecido
        UserClient.objects.create(user=user, securitylevel=securitylevel)
        
        return user 

# O ModelSerializer realiza a criação do documento sem precisar definir o create
class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = ["id", "title", "content", "securitylevel", "create_date", "author"]
        extra_kwargs = {"author": {"read_only": True}}
        