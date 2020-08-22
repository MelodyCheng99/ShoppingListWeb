from django.db import models

# Create your models here.

class ShoppingListList(models.Model):
  list_name = models.CharField(max_length=120, unique=True)

  def __str__(self):
    return self.list_name

class ShoppingListCategory(models.Model):
  category = models.CharField(max_length=120, blank=True, default='', unique=True)

  def __str__(self):
    return self.category

class ShoppingListItem(models.Model):
  item = models.CharField(max_length=120)
  description = models.TextField(blank=True, null=True, default='')
  importance = models.IntegerField(blank=True, null=True)
  due_date = models.DateField(blank=True, null=True)
  bought = models.BooleanField(default=False)
  list_name = models.ForeignKey(ShoppingListList, on_delete=models.CASCADE)
  category = models.ForeignKey(ShoppingListCategory, on_delete=models.SET_NULL, blank=True, null=True)
