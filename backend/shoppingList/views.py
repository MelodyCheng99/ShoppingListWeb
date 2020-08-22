from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import ShoppingListListSerializer, ShoppingListCategorySerializer, ShoppingListItemSerializer
from .models import ShoppingListList, ShoppingListCategory, ShoppingListItem
from datetime import datetime

# Create your views here.

class ShoppingListListView(viewsets.ModelViewSet):
  serializer_class = ShoppingListListSerializer
  queryset = ShoppingListList.objects.all()

  @action(detail=False)
  def lists(self, request):
    lists = ShoppingListList.objects.values(
      'id',
      'list_name'
    )
    return Response(lists)

  @action(detail=True)
  def items(self, request, *args, **kwargs):
    list_name_id = ShoppingListList.objects.get(pk=kwargs['pk']).id
    items = ShoppingListItem.objects.filter(list_name=list_name_id)
    categories = items.values_list('category', flat=True).distinct()

    items_response = {}
    nonCategorizedItems = []
    for category in categories:
      if (category != None):
        category_obj = ShoppingListCategory.objects.filter(pk=category)[0]
        category_id = category_obj.id
        category_name = category_obj.category

        items_response[category_name] = items.filter(category=category_id).values(
          'category',
          'item', 
          'description',
          'importance',
          'due_date',
          'bought'
        )
      else:
        nonCategorizedItems = items.filter(category=None).values(
          'category',
          'item', 
          'description',
          'importance',
          'due_date',
          'bought'
        )

    return Response(
      {
        'categorized_items': items_response,
        'non_categorized_items': nonCategorizedItems
      }
    )

class ShoppingListCategoryView(viewsets.ModelViewSet):
  serializer_class = ShoppingListCategorySerializer
  queryset = ShoppingListCategory.objects.all()

class ShoppingListItemView(viewsets.ModelViewSet):
  serializer_class = ShoppingListItemSerializer
  queryset = ShoppingListItem.objects.all()

  def create(self, request):
    if request.data['due_date'] != None:
      request.data['due_date'] = datetime.strptime(request.data['due_date'], '%d-%m-%Y').date()

    serializer = self.serializer_class(data=request.data)
    if serializer.is_valid():
      ShoppingListItemSerializer.create(self, request.data)
      return Response(
        serializer.validated_data,
        status=status.HTTP_201_CREATED
      )

    return Response({
      'status': 'Bad request',
      'message': 'Could not create item'
    }, status=status.HTTP_400_BAD_REQUEST)