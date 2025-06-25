Roommate Finder App - Backend (Server Side)
============================================

Description:
------------
This is the backend server for the Roommate Finder web application. It handles all API requests, user authentication, CRUD operations for roommate listings, and stores data using MongoDB.

Tech Stack:
-----------
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- CORS & dotenv
- bcrypt (optional, for password hashing if required)

Project Structure:
------------------
/server
  |-- index.js       
  |-- .env
  |-- server.js                 # Entry point
  |-- package.json

.env File Example:
------------------
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Installation Instructions:
--------------------------
1. Clone the repository.
2. Navigate to the backend folder: `cd server`
3. Install dependencies:
4. Create a `.env` file at the root of the `/server` directory and add the environment variables (see above).
5. Start the server: Or for production:



API Endpoints:
--------------
BASE URL: `http://localhost:5000/api/`

🔐 Auth Routes:
--------------
- POST `/auth/register`  
→ Register a new user with name, email, photoURL, and password.

- POST `/auth/login`  
→ Login user using email and password, returns JWT token.

🛏️ Listing Routes (All Protected using JWT):
--------------------------------------------
- GET `/listings`  
→ Get all roommate listings

- GET `/listings/featured`  
→ Get 6 available listings for home page

- GET `/listings/mine`  
→ Get listings added by the logged-in user

- GET `/listings/:id`  
→ Get details of a specific post by ID

- POST `/listings`  
→ Add a new roommate listing

- PUT `/listings/:id`  
→ Update a listing (must be owner)

- DELETE `/listings/:id`  
→ Delete a listing (must be owner)

- PATCH `/listings/like/:id`  
→ Add like to a listing (owner can't like their own)

Security Notes:
---------------
- All protected routes require the `Authorization: Bearer <token>` header.
- Only the post owner can update or delete their posts.
- Liking functionality ensures users cannot like their own posts.

Other Features:
---------------
- Uses MongoDB aggregation and limit operator for efficient queries (e.g., featured 6 posts).
- Validates and sanitizes all inputs.
- Shows like count and restricts unauthorized actions.

License:
--------
This project is for academic and demo purposes. Not licensed for production.


