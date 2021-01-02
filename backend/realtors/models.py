from django.db import models

# Create your models here.
class Realtor(models.Model):
  name = models.CharField(max_length=50)
  email = models.EmailField()
  phone = models.CharField(max_length=20, null=True)
  description = models.TextField(blank=True)
  photo = models.ImageField(upload_to='photos/%Y/%m/%d/')
  date_hired = models.DateTimeField(auto_now_add=True)
  top_seller = models.BooleanField(default=False)

  def __str__(self):
    return self.name