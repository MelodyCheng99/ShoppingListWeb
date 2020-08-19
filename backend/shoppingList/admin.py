from django.contrib import admin
from .models import ShoppingList

class ShoppingListAdmin(admin.ModelAdmin):
  list_display = ('list_name', 'category', 'item', 'description', 'importance', 'due_date', 'bought')

# Register your models here.

admin.site.register(ShoppingList, ShoppingListAdmin)
