from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    is_seller = models.BooleanField(default=False)

    USERNAME_FIELD = 'email' # For replacing username-based login to email-based login.
    REQUIRED_FIELDS = ['username'] # Username is still required for AbstractUser.

    def __str__(self):
        return self.email
