from ..models import Accounts, Application
from rest_framework import serializers


class AccountsSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input':'password'},write_only = True)
    class Meta:
        model = Accounts
        fields = ['id','first_name','last_name','email','username','phone','password','password2']

        extra_kwargs = {'password':{'write_only':True}}

    def save(self):
        register = Accounts(
            username = self.validated_data['username'],
            email = self.validated_data['email'],
            phone = self.validated_data['phone'],
            first_name = self.validated_data['first_name'],
            last_name = self.validated_data['last_name']
        )   

        password = self.validated_data['password']
        password2 = self.validated_data['password2'] 

        if password != password2:
            raise serializers.ValidationError({'password':'Password does not match'})
        
        register.set_password(password)
        register.save()
        return register

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'

    pending = serializers.BooleanField(default=True)  

