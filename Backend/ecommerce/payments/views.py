import razorpay
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .models import Payment
from orders.models import Order

client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


class PaymentInitView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')

        order = Order.objects.get(id=order_id, user=request.user, status='PENDING')

        razorpay_order = client.order.create({
            "amount": int(order.total_price * 100),  # paisa
            "currency": "INR",
            "payment_capture": 1
        })

        payment = Payment.objects.create(
            order=order,
            razorpay_order_id=razorpay_order['id']
        )

        return Response({
            "razorpay_order_id": razorpay_order['id'],
            "razorpay_key": settings.RAZORPAY_KEY_ID,
            "amount": razorpay_order['amount'],
            "currency": "INR"
        })


class PaymentVerifyView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data

        payment = Payment.objects.get(
            razorpay_order_id=data['razorpay_order_id']
        )

        try:
            client.utility.verify_payment_signature({
                'razorpay_order_id': data['razorpay_order_id'],
                'razorpay_payment_id': data['razorpay_payment_id'],
                'razorpay_signature': data['razorpay_signature'],
            })
        except:
            return Response(
                {"error": "Payment verification failed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment.razorpay_payment_id = data['razorpay_payment_id']
        payment.razorpay_signature = data['razorpay_signature']
        payment.status = 'PAID'
        payment.save()

        order = payment.order
        order.status = 'PAID'
        order.save()

        return Response({"message": "Payment successful"})
