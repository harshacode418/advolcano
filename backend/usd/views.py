import logging

import requests
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

logger = logging.getLogger(__name__)


class UsdToInrRateAPIView(APIView):
    """
    Fetch real-time USD to INR conversion using exchangerate-api.com
    """

    permission_classes = [AllowAny]
    EXCHANGE_RATE_URL = "https://api.exchangerate-api.com/v4/latest/USD"

    def get(self, request):
        try:
            response = requests.get(self.EXCHANGE_RATE_URL, timeout=5)
            response.raise_for_status()
            data = response.json()
            rate = float(data["rates"]["INR"])

            return Response(
                {
                    "rate": rate,
                    "source": "api.exchangerate-api.com",
                    "timestamp": data.get("date"),
                }
            )
        except Exception as exc:  # pragma: no cover - network failures
            logger.error("USD to INR conversion failed: %s", exc)
            return Response(
                {"detail": "Unable to fetch conversion rate at the moment."},
                status=503,
            )
