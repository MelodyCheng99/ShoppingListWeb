# Generated by Django 3.1 on 2020-08-19 14:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ShoppingList',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('list', models.CharField(max_length=120)),
                ('category', models.CharField(blank=True, default='', max_length=120)),
                ('item', models.CharField(max_length=120)),
                ('description', models.TextField(blank=True, default='')),
                ('importance', models.IntegerField(blank=True)),
                ('due_date', models.TimeField(blank=True)),
                ('bought', models.BooleanField(default=False)),
            ],
        ),
    ]