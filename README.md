# Happy Hour Heaven 🥂

Happy Hour Heaven is a full-stack e-commerce web application for browsing and purchasing alcoholic beverages online.

## Features

* User authentication
* Product listing
* Product details page
* Search products
* Filter products by category
* Sort products by price
* Shopping cart management
* Favorite products list
* Multi-language support
* Currency conversion
* Dark / Light theme
* User profile avatar
* Chatbot integration

## Tech Stack

### Frontend

* React
* Vite
* TanStack Router
* TanStack Query
* React i18next
* React Icons
* Context API

### Backend

* Django
* Django REST Framework
* SQLite

## Project Structure

```text
Happy-Hour-Haven
- Backend
- Frontend
- Stripe-server
```

## Getting Started

### Frontend

```bash
cd Frontend
npm run dev
```

### Backend

```bash
cd Backend
pip install -r requirements.txt
python manage.py runserver 9000
```

### Stripe server
```bash
cd Stripe-server
npm run dev
```

## Environment Variables

Create a `.env` file in the each directory if needed.

Example:
### Frontend
```env FROM FRONTEND
VITE_API_URL=YOUR_API_KEY
LOCIZE_API_KEY =YOUR_API_KEY
```

### Stripe server
```env FROM STRIPE SERVER
STRIPE_SECRET_KEY = YOUR_API_KEY
REACT_APP_STRIPE_PUBLISHABLE_KEY = YOUR_API_KEY
```



