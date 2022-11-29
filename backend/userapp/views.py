from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .api.serializers import ApplicationSerializer, AccountsSerializer
from rest_framework import status, permissions
from .models import Accounts,Application
import json
# Create your views here.

class bookingForm(APIView):
    permission_classes = [permissions.IsAuthenticated,]
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        print(request.user)
        booking = ApplicationSerializer(data=request.data)
        if booking.is_valid():
            booking.save()
            return Response(booking.data,status=status.HTTP_201_CREATED)
        else:
            print(booking.errors)
            return Response(booking.errors, status=status.HTTP_400_BAD_REQUEST)
    


class PendingList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request):
        pending = Application.objects.filter(pending = True, approved=False, declined=False, allotted=False)
        serializer = ApplicationSerializer(pending, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class Approving(APIView):   
    def post(self, request, id):
        try:
            booking = Application.objects.get(id=id)
            if booking.pending == True :
                booking.pending = False
                booking.approved = True
                booking.save()
                return Response(status=status.HTTP_200_OK)
        except:
            pass
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ApprovedList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request):
        booking = Application.objects.filter(approved = True)
        serializer = ApplicationSerializer(booking,many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Declining(APIView):
    def post(self,request,id):
        try:
            declining = Application.objects.get(id=id)
            if declining.pending == True :
                declining.pending = False
                declining.declined = True
                declining.save()
                return Response(status=status.HTTP_200_OK)
        except:
            pass
            return Response(status=status.HTTP_400_BAD_REQUEST)

class DeclinedView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        declined = Application.objects.filter(declined=True)
        serializer = ApplicationSerializer(declined, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserApplication(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        items = Application.objects.filter(user__username = user)
        serializer = ApplicationSerializer(items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class Slots(APIView):
    def post(self, request, pk, value):
        apps = Application.objects.get(id=pk)
        print(apps.allotted)
        apps.date_allotted = value
        apps.allotted = True
        apps.save()
        print(apps.date_allotted)
        print(apps.allotted)
        return Response(status=status.HTTP_201_CREATED)
        # else:
        #     print(serializer.errors)
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    def get(self,request):
        slot = Application.objects.filter(approved = True)
        serializer = ApplicationSerializer(slot, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['GET'])
def users(req):
    items = Accounts.objects.all()
    serializer = AccountsSerializer(items, many=True)
    return Response(serializer.data)
