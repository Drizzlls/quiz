# Generated by Django 4.0.4 on 2022-05-05 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quizPage', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='applications',
            name='date',
            field=models.DateTimeField(null=True),
        ),
    ]
