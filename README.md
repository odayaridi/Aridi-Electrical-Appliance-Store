# Aridi Electrical Appliance Store - Backend API

## Project Overview
A comprehensive e-commerce backend system for an electrical appliance store that manages the complete shopping experience from product browsing to order completion. The system handles user authentication, product management, shopping cart operations, order processing, payment tracking, customer reviews, and contact requests with secure role-based access control.

## Features

### User Management
- **Client Registration & Authentication**: Secure JWT-based user authentication
- **Profile Management**: Update and delete client accounts
- **Role-Based Access**: Separate permissions for Users and Administrators
- **Username & ID Search**: Admin tools to find and manage clients

### Product Management
- **Product Catalog**: Browse all electrical appliances
- **Category Filtering**: Search products by category
- **Product Search**: Find products by name or name + category combination
- **Inventory Management**: Admin control over product quantities
- **Product Details**: View detailed product information

### Shopping Cart System
- **Cart Creation**: Automatic cart creation for registered users
- **Add to Cart**: Add products with specified quantities
- **Remove from Cart**: Delete individual items or clear entire cart
- **View Cart**: Display all items in user's shopping cart
- **Cart Persistence**: Cart data saved across sessions

### Order Processing
- **Place Orders**: Convert cart items to confirmed orders
- **Order History**: View completed orders
- **Order Tracking**: Monitor order status and details
- **Order Management**: Admin capabilities to manage and cancel orders
- **Purchase Verification**: Check if client has ordered specific products

### Payment System
- **Payment Processing**: Handle order payments
- **Payment Tracking**: Link payments to orders
- **Transaction Records**: Maintain payment history

### Product Reviews
- **Submit Reviews**: Customers can review purchased products
- **View Reviews**: Display all product reviews
- **Search Reviews**: Find reviews by product name
- **Review Validation**: Only verified purchasers can review

### Contact & Support
- **Contact Requests**: Users can submit inquiries
- **Request Management**: Admins view and manage contact requests
- **Search Requests**: Filter contact requests by customer name

## Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing and security

### Architecture Pattern
- **Repository Pattern**: Database abstraction layer
- **Service Layer**: Business logic implementation
- **Controller Layer**: HTTP request handling
- **Middleware Stack**: Authentication, authorization, validation, error handling

## Project Structure
```
aridi-store-backend/
├── controllers/              # Request handlers
│   ├── ClientController.js
│   ├── ProductController.js
│   ├── ShoppingCartController.js
│   ├── OrderController.js
│   ├── OrderProdsController.js
│   ├── ProductReviewController.js
│   └── ContactRequestController.js
├── services/                # Business logic
│   ├── ClientService.js
│   ├── ProductService.js
│   ├── ShoppingCartService.js
│   ├── CartProdsService.js
│   ├── OrderService.js
│   ├── OrderProdsService.js
│   ├── ProductReviewService.js
│   └── ContactRequestService.js
├── repositories/            # Data access layer
│   ├── ClientRepository.js
│   ├── ProductRepository.js
│   ├── ShoppingCartRepository.js
│   ├── CartProdsRepository.js
│   ├── OrderRepository.js
│   ├── OrderProdsRepository.js
│   ├── PaymentRepository.js
│   ├── ProductReviewRepository.js
│   └── ContactRequestRepository.js
├── models/                  # Database models
│   ├── CartProdsModel.js
│   ├── ClientModel.js
│   ├── ContactRequestModel.js
│   ├── OrderModel.js
│   ├── OrderProdsModel.js
│   ├── PaymentModel.js
│   ├── ProductModel.js
│   ├── ProductReviewModel.js
│   └── ShoppingCartModel.js
├── routes/                  # API endpoints
│   ├── clientRoutes.js
│   ├── productRoutes.js
│   ├── shoppingCartRoutes.js
│   ├── orderRoutes.js
│   ├── orderProdsRoutes.js
│   ├── productReviewRoutes.js
│   └── contactRequestRoutes.js
├── middleware/              # Custom middleware
│   ├── authenticate.js
│   ├── restrictTo.js
│   ├── validateRequest.js
│   └── errorCatcher.js
├── validations/            # Input validation schemas
│   ├── ClientValidation.js
│   ├── ProductValidation.js
│   ├── ShoppingCartValidation.js
│   ├── OrderValidation.js
│   ├── OrderProdsValidation.js
│   ├── ProductReviewValidation.js
│   └── ContactRequestValidation.js
└── config/                 # Configuration files
```

## API Endpoints

### Client Routes
```
POST   /api/clients/insert                    - Register new client
POST   /api/clients/auth                      - Client login
GET    /api/clients/getClients                - Get all clients (Admin)
GET    /api/clients/getClientById/:id         - Get client by ID (Admin)
GET    /api/clients/getClientByUsername       - Get client by username (Admin)
PUT    /api/clients/update/:cId               - Update client profile
PUT    /api/clients/delete/:cId               - Soft delete client
```

### Product Routes
```
GET    /api/products/getAllProducts            - Get all products (Public)
GET    /api/products/getProduct/:pId           - Get product by ID
GET    /api/products/getProductsByCategory     - Get products by category
GET    /api/products/getProductByName          - Search product by name
GET    /api/products/getProductByNameAndCategory - Search by name + category
GET    /api/products/getProductQuanityById/:pId  - Get product quantity
PUT    /api/products/updateProdQuantity        - Update product quantity (Admin)
```

### Shopping Cart Routes
```
POST   /api/cart/insertCart                   - Create shopping cart
DELETE /api/cart/deleteCart                   - Delete shopping cart
POST   /api/cart/insertCartProd               - Add product to cart
DELETE /api/cart/deleteCartProd               - Remove product from cart
GET    /api/cart/getCartProds                 - Get all cart products
```

### Order Routes
```
POST   /api/orders/insertOrder                - Place new order
GET    /api/orders/getCompletedOrders         - Get all completed orders (Admin)
GET    /api/orders/getCompletedOrdersByCId/:cId - Get orders by client ID (Admin)
PUT    /api/orders/deleteOrder/:oId           - Cancel order (Admin)
GET    /api/orders/checkProdOrderByClient     - Check if client ordered product
```

### Order Products Routes
```
GET    /api/order-products/getAllOrdersProds  - Get all order products (Admin)
DELETE /api/order-products/deleteOrderProd    - Delete order product (Admin)
```

### Product Review Routes
```
POST   /api/reviews/insertProdRev             - Submit product review
GET    /api/reviews/getProdRevs               - Get all reviews (Admin)
GET    /api/reviews/getProdRevsByName         - Get reviews by product name (Admin)
```

### Contact Request Routes
```
POST   /api/contact/insertContReq             - Submit contact request
GET    /api/contact/getContactRequests        - Get all contact requests (Admin)
GET    /api/contact/getContReq                - Get contact requests by name (Admin)
```

## Role-Based Permissions

### User (Customer) Permissions
- Register and authenticate
- Browse and search products
- Manage personal shopping cart
- Place and track orders
- Submit product reviews
- Send contact requests
- Update personal profile

### Admin Permissions
- View all clients and orders
- Manage product inventory
- Update product quantities
- View and manage contact requests
- Access all product reviews
- Delete orders and order products
- Search clients by username/ID
- View completed order history

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm 
- Database (Heidi Sql MariaDb recommended)

### Setup
```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the server
npm start

# Development mode with auto-reload
npm run dev
```

## Environment Variables
```env
PORT=3003
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

## Middleware Components

### Authentication (`authenticate.js`)
- Validates JWT tokens
- Extracts user information from token
- Protects authenticated routes

### Authorization (`restrictTo.js`)
- Role-based access control
- Validates user permissions
- Restricts endpoint access by role

### Validation (`validateRequest.js`)
- Input validation using express-validator
- Sanitizes user inputs
- Validates request body, params, and query

### Error Handling (`errorCatcher.js`)
- Centralized error catching
- Consistent error response format
- Logging for debugging

## Security Features
- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Bcrypt encryption for passwords
- **Role-Based Access Control**: Granular permission system
- **Input Validation**: Prevent injection attacks
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization
- **Soft Deletes**: Data preservation for audit trails

## Error Responses
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"]
}
```

## Success Responses
```json
{
  "success": true,
  "message": "Successful Description",
  "data": { ... }
}
```
