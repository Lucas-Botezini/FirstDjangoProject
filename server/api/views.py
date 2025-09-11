from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, DocumentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Document
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import redirect
from django.contrib.auth import login

# As views controlam a lógica de requisição/resposta. Aqui estão baseadas em class-based views do Django REST Framework.

# Lista todos os documentos e cria um novo documento
class DocumentListCreate(generics.ListCreateAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated] # Requer autenticação

    def get_queryset(self):
        user = self.request.user
        return Document.objects.filter(author=user)
    
    def perform_create(self, serializer):
        # Verifica se os dados são válidos antes de salvar
        if serializer.is_valid():
            # Adiciona o usuário autenticado como autor do documento
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class DocumentDelete(generics.DestroyAPIView):
    serializer_class = DocumentSerializer
    permission_classes = [IsAuthenticated] # Requer autenticação 

    def get_queryset(self):
        user = self.request.user
        return Document.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Não requer autenticação

