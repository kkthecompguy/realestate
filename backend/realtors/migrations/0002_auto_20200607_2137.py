# Generated by Django 3.0.7 on 2020-06-07 18:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('realtors', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='realtor',
            old_name='created_at',
            new_name='date_hired',
        ),
    ]
