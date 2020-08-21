# Generated by Django 3.1 on 2020-08-21 13:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('shoppingList', '0005_auto_20200821_1339'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shoppinglistcategory',
            name='category',
            field=models.CharField(blank=True, default='', max_length=120, unique=True),
        ),
        migrations.AlterField(
            model_name='shoppinglistitem',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='shoppingList.shoppinglistcategory', to_field='category'),
        ),
    ]