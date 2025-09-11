from django.db import models
from django.contrib.auth.models import User

# Esse arquivo define as tabelas do banco de dados (models) da aplicação.

class SecurityLevel(models.IntegerChoices):
    UNCLASSIFIED = 0, "Unclassified"
    CONFIDENTIAL = 1, "Confidential"
    SECRET = 2, "Secret"
    TOP_SECRET = 3, "Top Secret"

class Document(models.Model):
    title = models.CharField(max_length=30) 
    content = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)
    securitylevel  = models.IntegerField(
        choices=SecurityLevel.choices,
        default=SecurityLevel.UNCLASSIFIED,
        db_index=True,
    )
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="documents"
    )

    def __str__(self):
        return self.title
    
class UserClient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="userclient")
    securitylevel  = models.IntegerField(
        choices=SecurityLevel.choices,
        default=SecurityLevel.UNCLASSIFIED,
        db_index=True,
    )

    def __str__(self):
        return self.user.username
