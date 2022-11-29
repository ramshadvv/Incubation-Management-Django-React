from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from  .serializers import AccountsSerializer
from rest_framework import status, permissions
from ..models import Accounts


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = user.id
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['is_admin'] = user.is_admin
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/token',
        '/token/refresh',
    ]
    return Response(routes)

class Register(APIView):
    def post(self,request):
        account = AccountsSerializer(data=request.data)
        if account.is_valid():
            account.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            print(account.errors)
            return Response(status=status.HTTP_400_BAD_REQUEST)  


class getUser(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    def get(self, request):
        user = Accounts.object.get(username = request.user)
        user = AccountsSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)