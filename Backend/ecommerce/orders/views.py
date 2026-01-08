from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.db import transaction
from .models import Order, OrderItem
from .serializers import OrderSerializer
from cart.models import Cart
from products.models import Product


class CreateOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        cart = Cart.objects.filter(user=request.user).first()

        if not cart or not cart.items.exists():
            return Response(
                {"error": "Cart is empty"},
                status=status.HTTP_400_BAD_REQUEST
            )

        total_price = 0
        order = Order.objects.create(user=request.user, total_price=0)

        for item in cart.items.select_for_update():
            product = item.product

            if product.stock < item.quantity:
                raise Exception(f"Insufficient stock for {product.name}")

            product.stock -= item.quantity
            product.save()

            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item.quantity,
                price=product.price
            )

            total_price += product.price * item.quantity

        order.total_price = total_price
        order.save()

        cart.items.all().delete()

        return Response(
            {"message": "Order placed successfully", "order_id": order.id},
            status=status.HTTP_201_CREATED
        )


class OrderListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        orders = Order.objects.filter(user=request.user).order_by('-created_at')
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)


class OrderDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        order = Order.objects.get(pk=pk, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data)
