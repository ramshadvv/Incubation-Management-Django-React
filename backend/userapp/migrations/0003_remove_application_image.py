# Generated by Django 4.1.3 on 2022-11-26 15:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userapp', '0002_application_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='application',
            name='image',
        ),
    ]
