from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import ShoppingListListSerializer, ShoppingListCategorySerializer, ShoppingListItemSerializer
from .models import ShoppingListList, ShoppingListCategory, ShoppingListItem

# Create your views here.

class ShoppingListListView(viewsets.ModelViewSet):
  serializer_class = ShoppingListListSerializer
  queryset = ShoppingListList.objects.all()

  @action(detail=False)
  def lists(self, request):
    lists = ShoppingListList.objects.values_list('list_name', flat=True).distinct()
    return Response(lists)

class ShoppingListCategoryView(viewsets.ModelViewSet):
  serializer_class = ShoppingListCategorySerializer
  queryset = ShoppingListCategory.objects.all()

class ShoppingListItemView(viewsets.ModelViewSet):
  serializer_class = ShoppingListItemSerializer
  queryset = ShoppingListItem.objects.all()