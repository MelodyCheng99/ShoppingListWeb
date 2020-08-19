from django.db import models

# Create your models here.

class ShoppingList(models.Model):
  list = models.CharField(max_length=120)
  category = models.CharField(max_length=120, blank=True, default='')
  item = models.CharField(max_length=120)
  description = models.TextField(blank=True, default='')
  importance = models.IntegerField(blank=True)
  due_date = models.TimeField(blank=True)
  bought = models.BooleanField(default=False)

  def _str_(self):
    return self.item