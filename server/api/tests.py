from django.test import TestCase
from .models import Document

class DocumentModelTest(TestCase):
    def test_create_document(self):
        doc = Document.objects.create(title="Teste")
        self.assertEqual(doc.title, "Teste")

# É o arquivo para escrever testes automatizados para o app.

# Com isso pode ser rodado o comando abaixo para rodar o teste.
# python manage.py test
