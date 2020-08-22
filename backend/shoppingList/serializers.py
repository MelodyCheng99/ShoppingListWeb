from rest_framework import serializers
from .models import ShoppingListList, ShoppingListCategory, ShoppingListItem

class ShoppingListListSerializer(serializers.ModelSerializer):
  class Meta:
    model = ShoppingListList
    fields = ('id', 'list_name')
    
class ShoppingListCategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = ShoppingListCategory
    fields = ('id', 'category')

class ShoppingListItemSerializer(serializers.ModelSerializer):
  list_name = serializers.CharField()
  category = serializers.CharField(required=False)

  def create(self, validated_data):
    shopping_list_list = ShoppingListList.objects.get(list_name=validated_data['list_name'])
    validated_data['list_name'] = shopping_list_list

    if ('category' in validated_data) and validated_data['category'] != None:
      shopping_list_category = ShoppingListCategory.objects.get(category=validated_data['category'])
      validated_data['category'] = shopping_list_category
    
    return ShoppingListItem.objects.create(**validated_data)

  def update(self, instance, validated_data):
    shopping_list_list = ShoppingListList.objects.get(list_name=validated_data['list_name'])
    instance.list_name = shopping_list_list

    if 'category' in validated_data:
      shopping_list_category = ShoppingListCategory.objects.get(category=validated_data['category'])
      instance.category = shopping_list_category

    instance.item = validated_data.get('item', instance.item)
    instance.description = validated_data.get('description', instance.description)
    instance.importance = validated_data.get('importance', instance.importance)
    instance.due_date = validated_data.get('due_date', instance.due_date)
    instance.bought = validated_data.get('bought', instance.bought)
    instance.save()
    return instance

  class Meta:
    model = ShoppingListItem    
    fields = ('id', 'list_name', 'category', 'item', 'description', 'importance', 'due_date', 'bought')
