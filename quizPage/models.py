from django.db import models

# Create your models here.
class Applications(models.Model):
    name = models.CharField(max_length=150,verbose_name="фио клиента", null=True)
    email = models.CharField(max_length=150, verbose_name="email", null=True)
    phone = models.CharField(max_length=150, verbose_name="телефон клиента", null=True)
    utmSource = models.CharField(max_length=150, verbose_name="utmSource", null=True)
    utmMedium = models.CharField(max_length=150, verbose_name="utmMedium", null=True)
    utmContent = models.CharField(max_length=150, verbose_name="utmContent", null=True)
    utmCampaign = models.CharField(max_length=150, verbose_name="utmCampaign", null=True)
    utmTerm = models.CharField(max_length=150, verbose_name="utmTerm", null=True)
    date = models.DateTimeField(null=True)


