from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ShoppingListSerializer
from .models import ShoppingList

# Create your views here.

class ShoppingListView(viewsets.ModelViewSet):
  serializer_class = ShoppingListSerializer
  queryset = ShoppingList.objects.all()
