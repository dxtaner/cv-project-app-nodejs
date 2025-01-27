Cv Project App
============

This project is a platform aimed at facilitating the job search process between candidates and companies.
The app provides different routes for managing candidates, companies, and administrative operations.

Features
--------

*   Connects to MongoDB using Mongoose.
*   Has API routes for handling candidates, companies, and admin operations.
*   Implements CORS (Cross-Origin Resource Sharing) to allow cross-origin requests.
*   Uses `dotenv-safe` for environment variable management.

Installation
------------

1.  Clone the repository:
    
        git clone (https://github.com/dxtaner/cv-project-app-nodejs)
    
2.  Navigate to the project directory:
    
        cd your-repository
    
3.  Install the dependencies:
    
        npm install
    
4.  Create a `.env` file at the root of the project and define the MongoDB URL:
    
        MONGODB_URL=mongodb://your-database-url
    
5.  Run the application:
    
        npm start
    
    The app will start running on `http://localhost:3000`.

Routes
------

*   **GET /**: Main route for the index.
*   **GET /candidates**: Get all candidates.
*   **POST /candidates**: Add a new candidate.
*   **GET /companies**: Get all companies.
*   **POST /companies**: Add a new company.
*   **GET /admin**: Admin dashboard (protected route).

Dependencies
------------

*   `express`: A fast, unopinionated, minimalist web framework for Node.js.
*   `body-parser`: Middleware to parse incoming request bodies.
*   `mongoose`: MongoDB object modeling for Node.js.
*   `dotenv-safe`: A safe way to manage environment variables.
*   `cors`: Middleware to enable Cross-Origin Resource Sharing.

Configuration
-------------

The application expects an environment variable `MONGODB_URL` to be set in the `.env` file, which holds the MongoDB connection string.

License
-------

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
