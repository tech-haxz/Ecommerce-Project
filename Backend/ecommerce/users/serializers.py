from rest_framework import serializers
from .models import CustomUser
import re

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = (
            "email",
            "username",
            "password",
            "phone",
        )

    
    def validate_password(self, value):
        password_regex = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
        if len(value) < 8 or value == '':
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        
        if not bool(re.match(password_regex, value)):
            raise serializers.ValidationError(
                "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
            )
        
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            phone=validated_data.get('phone')
        )
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username', 'phone', 'is_seller')
