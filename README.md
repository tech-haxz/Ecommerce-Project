# 🛒 Full-Stack E-Commerce Web Application

A **production-ready E-commerce web application** built using **Django REST Framework (DRF)** for the backend and **Vite + React.js** for the frontend.  
This project follows **industry-level architecture, security best practices, and clean code principles**.

The system is **API-first**, making it scalable and suitable for web and mobile clients.

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication (Access + Refresh tokens)
- Secure token handling:
  - Access token stored in memory
  - Refresh token stored in **HttpOnly cookies**
- Automatic token refresh using Axios interceptors
- Protected routes (frontend & backend)
- Role-based access control (Admin / Seller / Customer)

---

### 🛍️ Product Management
- Category and product management
- Seller-based product creation
- Product image upload support
- Stock availability handling
- Public product listing APIs

---

### 🛒 Cart System
- One cart per user
- Add, update, and remove cart items
- Dynamic cart total calculation
- Stock validation before checkout

---

### 📦 Orders
- Cart → Order conversion
- Atomic database transactions
- Automatic stock deduction
- Order history and order detail APIs

---

### 💳 Payments
- Payment initiation and verification flow
- Secure server-side payment validation
- Order status update after successful payment

---

### 🎨 Frontend (React)
- Built using **Vite + React.js**
- Clean, minimal, and professional UI
- Separate CSS file for each page
- Axios API service layer
- Protected routes with authentication guards

---

## 🧱 Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- Simple JWT
- Pillow (image handling)
- SQLite / PostgreSQL

### Frontend
- Vite
- React.js (JavaScript)
- Axios
- React Router
- Pure CSS (no UI framework)

---



---

## 🔐 Authentication Flow

1. User logs in
2. Backend returns:
   - Access token in response body
   - Refresh token via HttpOnly cookie
3. Frontend stores access token in memory
4. Axios interceptors attach token to requests
5. Token is automatically refreshed on expiry
6. Protected routes ensure secure access

---

## ⚙️ Backend Setup

```bash
git clone <repository-url>
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## ⚙️ Frontend Setup 

```bash
cd frontend
npm install
npm run dev

```

