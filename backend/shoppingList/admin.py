from django.contrib import admin
from .models import ShoppingListList, ShoppingListCategory, ShoppingListItem

class ShoppingListListAdmin(admin.ModelAdmin):
  list_display = ('id', 'list_name')

class ShoppingListCategoryAdmin(admin.ModelAdmin):
  list_display = ('id', 'category')

class SHoppingListItemAdmin(admin.ModelAdmin):
  list_display = ('id', 'list_name', 'category', 'item', 'description', 'importance', 'due_date', 'bought')

# Register your models here.

admin.site.register(ShoppingListList, ShoppingListListAdmin)
admin.site.register(ShoppingListCategory, ShoppingListCategoryAdmin)
admin.site.register(ShoppingListItem, SHoppingListItemAdmin)
