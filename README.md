--README FILE--


*This repository contains an application for managing users, products, and favorites. The application is built using Node.js, Express.js, and PostgreSQL*

--Machine Setup--

-Before running the application, make sure you have Node.js and PostgreSQL installed on your system.

-Clone this repository to your local machine.

-Install dependencies by running npm install.

-Set up your PostgreSQL database and provide the connection URL or use the default connection to postgres://localhost/acme_store_db.

-Run the database migration and seeding script by executing node db.js. This script will create necessary tables and seed initial data.

*Structure*

-index.js:
The index.js file is the entry point of the application. 
It sets up the Express server, defines routes for handling HTTP requests, and initializes the database connection. 

-Here's a brief overview of what each part does:

-Express Setup: Initializes the Express application and sets up middleware for parsing JSON and logging.

Routes:
-/api/users: GET endpoint to fetch all users.

-/api/products: GET endpoint to fetch all products.

-/api/users/:id/favorites: GET endpoint to fetch favorites of a specific user.

-/api/users/:id/favorites: POST endpoint to add a favorite for a user.

-/api/users/:userId/favorites/:id: DELETE endpoint to remove a favorite for a user.

-Database Initialization:

Connects to the PostgreSQL database, creates necessary tables, and seeds initial data.

-Server Start: 

-Starts the Express server and listens for incoming requests.

db.js:

-The db.js file contains functions related to database operations using the pg library. 

-These functions handle tasks such as creating tables, inserting data, fetching data, and deleting data. Here's a summary of each function:

-client: PostgreSQL client instance used to execute queries.

-createTables: Creates necessary tables in the database (users, products, favorites).

-createUser: Inserts a new user into the database.

-createProduct: Inserts a new product into the database.

-fetchUsers: Retrieves all users from the database.

-fetchProducts: Retrieves all products from the database.

-createFavorite: Adds a favorite product for a user in the database.

-fetchFavorites: Retrieves all favorite products of a user from the database.

-destroyFavorite: Deletes a favorite product of a user from the database.

Usage:

-Once the setup is complete, you can start the application by running node index.js. 

-The server will start listening on the specified port (default is 3000).

You can use the provided curl commands to interact with the API endpoints and test functionality.

Testing:

-You can test the application by sending HTTP requests to the defined endpoints using tools like curl or Postman.

-Additionally, you can write unit tests using testing frameworks like Jest or Mocha.

Dependencies:

-express: Web framework for Node.js.

-pg: PostgreSQL client for Node.js.

-uuid: Generates UUIDs for unique identifiers.

-bcrypt: Library for hashing passwords securely.

-morgan: HTTP request logger middleware for Node.js.

-Environment Variables

-DATABASE_URL: Connection URL for PostgreSQL database (optional, default is postgres://localhost/acme_store_db).

-PORT: Port on which the Express server will listen (optional, default is 3000).
