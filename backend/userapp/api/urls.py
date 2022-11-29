from django.urls import path
from .. import views
from . import views as apiviews
from rest_framework_simplejwt.views import (    
    TokenRefreshView,
)

urlpatterns = [
    path('api/', apiviews.getRoutes, name="home"),
    path('api/token/', apiviews.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', apiviews.Register.as_view(), name="register"),
    path('booking/', views.bookingForm.as_view(), name="booking"),
    path('pendinglist/', views.PendingList.as_view(), name="pendinglist"),
    path('approving/<int:id>/', views.Approving.as_view(), name="approving"),
    path('approvedlist/', views.ApprovedList.as_view(), name="approvedlist"),
    path('declining/<int:id>/', views.Declining.as_view(), name="declining"),   
    path('declinedlist/', views.DeclinedView.as_view(), name="declinedlist"),
    path('slotbooking/<int:pk>/<str:value>/', views.Slots.as_view(), name="slotbooking"),
    path('slottedlist/', views.Slots.as_view(), name="slottedlist"),
    path('users/', views.users, name="users"),
    path('me/', apiviews.getUser.as_view(), name="myprofile"),
    path('userapplication/', views.UserApplication.as_view(), name="userapplication"),
]