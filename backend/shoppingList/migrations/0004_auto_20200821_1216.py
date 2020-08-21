# Generated by Django 3.1 on 2020-08-21 12:16

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shoppingList', '0003_auto_20200819_2238'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShoppingListCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(blank=True, default='', max_length=120)),
            ],
        ),
        migrations.CreateModel(
            name='ShoppingListItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item', models.CharField(max_length=120)),
                ('description', models.TextField(blank=True, default='')),
                ('importance', models.IntegerField(blank=True, null=True)),
                ('due_date', models.TimeField(blank=True, null=True)),
                ('bought', models.BooleanField(default=False)),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='shoppingList.shoppinglistcategory')),
            ],
        ),
        migrations.CreateModel(
            name='ShoppingListList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('list_name', models.CharField(max_length=120)),
            ],
        ),
        migrations.DeleteModel(
            name='ShoppingList',
        ),
        migrations.AddField(
            model_name='shoppinglistitem',
            name='list_name',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='shoppingList.shoppinglistlist'),
        ),
    ]