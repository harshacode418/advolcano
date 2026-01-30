from rest_framework import serializers

class PaymentSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=255)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=15)
    amount_usd = serializers.FloatField(min_value=0.01)
    amount_inr = serializers.FloatField(min_value=0.01)
    commission = serializers.FloatField(min_value=0.0)
    total_amount = serializers.FloatField(min_value=0.01)
