from rest_framework import serializers
from .models import ShoppingList

class ShoppingListSerializer(serializers.ModelSerializer):
  class Meta:
    model = ShoppingList
    fields = ('id', 'list_name', 'category', 'item', 'description', 'importance', 'due_date', 'bought')
