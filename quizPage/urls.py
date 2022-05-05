from django.contrib import admin
from django.urls import path, include
from .views import indexQuiz,thsQuiz

urlpatterns = [
    path('', indexQuiz),
    path('ths', thsQuiz,name="ths"),
]
