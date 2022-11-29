from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin
import string
import random

# Create your CustomManager here.

def generate_unique_code():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase,k=length))
        if Accounts.objects.filter(id=code).count() == 0:
            break
    return code


class AccountManager(BaseUserManager):
    def _create_user(self, first_name, last_name, username, email, phone, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not username:
            raise ValueError('The given email must be set')
        if not email:
            raise ValueError('The given email must be set')
        user = self.model(
            first_name = first_name,
            last_name= last_name,
            username = username,
            email=email,
            phone=phone,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    

    def create_user(self, first_name, last_name, username, email, phone, password, **extra_fields):
        extra_fields.setdefault('is_admin', False)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(first_name, last_name, username, email, phone, password, **extra_fields)


    def create_superuser(self, first_name, last_name, username, email, phone, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(first_name, last_name, username, email, phone, password, **extra_fields)


# Create your models here.


class Accounts(AbstractUser,PermissionsMixin):
    first_name = models.CharField(max_length=50, null = True)
    last_name = models.CharField(max_length=50, null = True)
    username = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True,max_length=255)
    phone = models.CharField(max_length=50,unique=True)


    #required


    date_joined     =   models.DateTimeField(auto_now_add=True)
    last_login      =   models.DateTimeField(auto_now_add=True)
    is_admin        =   models.BooleanField(default=False)
    is_staff        =   models.BooleanField(default=False)
    is_active       =   models.BooleanField(default=True)
    is_superuser    =   models.BooleanField(default=False)
    

    def __str__(self):
        return self.username
    

    object = AccountManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name','last_name','email','phone']
    

    class meta:
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'


class Application(models.Model):
    user = models.ForeignKey(Accounts, on_delete = models.CASCADE, null=True)
    name = models.CharField(max_length=100,null=True)
    address = models.CharField(max_length = 200)
    phone = models.IntegerField()
    email = models.EmailField()
    city = models.CharField(max_length = 200)
    state = models.CharField(max_length = 100)
    company_name = models.CharField(max_length=200)
    team_background = models.TextField()
    company_products = models.TextField()
    solve = models.TextField()
    solution = models.TextField()
    incubation_needed = models.CharField(max_length = 100)
    business_proposal = models.TextField()
    date_allotted     = models.DateField(default='2022-01-01', blank=True)


    approved = models.BooleanField(default=False)
    declined = models.BooleanField(default=False)
    pending = models.BooleanField(default=True)
    allotted = models.BooleanField(default=False)

    def __str__(self):
        return self.company_name

