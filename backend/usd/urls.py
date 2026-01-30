from django.urls import path

from .views import UsdToInrRateAPIView

urlpatterns = [
    path("usd-to-inr/", UsdToInrRateAPIView.as_view(), name="usd-to-inr"),
]

