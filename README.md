# Inventory Management API with Analytics

## Controllers
- **admin.controller.js**
Contains controller functions related to admin operations.
- **analytics.controller.js**
Contains controller functions related to analytics.
- **auth.controller.js**
Contains controller functions related to authentication.
- **orders.controller.js**
Contains controller functions related to order operations.
- **product.controller.js**
Contains controller functions related to product operations.
- **user.controller.js**
Contains controller functions related to user operations.

## Middleware
### auth
- **requireLogin.js** : Middleware for authentication and authorization of both admin and user routes.
### validation
- **productValidation.js** : Contains validation functions for products and orders.


## Routes
### admin.js
- **/profile (GET)** : Requires user login. Retrieves the user profile for the currently logged-in admin.
- **/user/:id/orders (GET)** : Requires authentication middleware. Retrieves orders associated with a specific user.
- **/user/:id/orders/:orderid (GET)** : Requires authentication middleware. Retrieves details of a specific order placed by a user.
- **/analytics/top-products (GET)** : Requires authentication middleware. Retrieves analytics data for top products.
- **/analytics/top-users (GET)** : Requires authentication middleware. Retrieves analytics data for top users.

### auth.js
- **/signup (POST)** : Handles user signup requests.
- **/login (POST)** : Handles user login requests.
- **/admin-login (POST)** : Handles admin login requests.

### product.js
- **/getProduct (GET)** : Retrieves all products.
- **/getProduct/:id (GET)** : Retrieves a product by ID.
- **/insertProduct (POST)** : Inserts a new product.
- **/search (POST)** : Searches for products based on name or description.

### user.js
- **/profile (GET)** : Requires authentication middleware. Retrieves the user profile.
- **/order (GET)** : Requires authentication middleware. Retrieves orders associated with the current user.
- **/order/:id (GET)** : Requires authentication middleware. Retrieves details of a specific order placed by the current user.
- **/createOrder (POST)** : Requires authentication middleware. Creates a new order.

## Services
### adminServices.js
This module contains SQL queries related to the admin table.
- **loginUser** : SQL query to authenticate admin users.
- **getUsersByEmail** : SQL query to retrieve admin users by email.

### productService.js
This module handles operations related to products.
- **insertNewProduct** : Inserts a new product into the database.
- **getProduct** : Retrieves product details.
- **getProductById** : Retrieves product by ID.
- **getProductCount** : Retrieves the total count of products.
- **getSearchProduct** : Searches for products based on name or description.

### userService.js
This module handles operations related to users.
- **createNewUser** : Creates a new user account.
- **loginUser** : Authenticates users.
- **getUsersByEmail** : Retrieves users by email.

### orderService
This module contains SQL queries related to the order table.
- **checkQuantity** : SQL query to check product quantity availability.
- **updateStockQuantity** : SQL query to update product stock quantity.
- **createNewOrder** : SQL query to create a new order.
- **getOrdersByUserId** : SQL query to retrieve orders by user ID.
- getOrdersViewByUserId** : SQL query to retrieve order details by user ID.
- **getUserOrderCount** : SQL query to count the number of orders placed by a user.
- **userOrders** : SQL query to fetch user orders.
- **getTopOrderedProduct** : SQL query to retrieve the top ordered products.
- **getTopUserOrders** : SQL query to retrieve top user orders.

## Utils
### db.js
This module handles the MySQL database connection.
### config.js
This module imports configuration variables from a .env file using dotenv.