from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import ShoppingListSerializer
from .models import ShoppingList

# Create your views here.

class ShoppingListView(viewsets.ModelViewSet):
  serializer_class = ShoppingListSerializer
  queryset = ShoppingList.objects.all()

  @action(detail=False)
  def lists(self, request):
    lists = ShoppingList.objects.values_list('list_name', flat=True).distinct()
    return Response(lists)