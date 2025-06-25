# 🏡 Roommate Finder (MERN Stack)

**Roommate Finder** is a full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It helps users find and manage roommate listings based on preferences, location, and lifestyle.

---

## 📁 Folder Structure

Roommate-Finder/
├── frontend/ # React.js client application
└── backend/ # Node.js & Express server API


---

### ✅ Step 1: Clone the Repository
Open your terminal in **VS Code** and run:

```bash

git clone https://github.com/your-username/Roommate-Finder.git
cd Roommate-Finder
code .  # opens project in VS Code

```
---

### 🛠 Step 2: Setup Frontend (React + Tailwind)

Navigate to frontend/: 
```bash
cd frontend
```
Install dependencies: 
```bash
npm install
```

Start the frontend dev server: 
```bash
npm run dev
```
Visit the app in your browser:
```bash
http://localhost:5173
```
---

### 🔧 Step 3: Setup Backend (Node + Express + MongoDB)
Open a new terminal in VS Code.

Navigate to backend/:
```bash
cd backend
```
Install backend dependencies:
```bash
npm install
```
Create a .env file in the backend/ directory and add the following:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the backend server:
```bash
npm run dev
```
Your backend API is now running on: http://localhost:5000/api

---

### 🔐 Features
#### Client Side
Google Login (Firebase)
Add / Update / Delete Posts (owners only)
Like a post to reveal contact info
View your submitted listings
Protected routes for logged-in users only

#### Server Side
JWT-based authentication
MongoDB with Mongoose
RESTful API with secure access
Authorization for post owners

---

### 📦 Tech Stack
Frontend	Backend	Database
React + Vite	Node + Express	MongoDB
Tailwind CSS	JWT, dotenv	Mongoose
Firebase Auth	CORS	
---

### ⚙️ API Routes (Protected with JWT)
#### Method	Route	Description
POST	/auth/register	Register new user
POST	/auth/login	Login and receive token
GET	/listings	Get all listings
GET	/listings/featured	Get 6 featured posts
GET	/listings/mine	User's own listings
POST	/listings	Create a new listing
PUT	/listings/:id	Update a listing
DELETE	/listings/:id	Delete a listing
PATCH	/listings/like/:id	Like a listing (except own post)
---

###📌 Notes
Use .env files to manage environment variables
Make sure MongoDB is running (local or Atlas)
Use VS Code Terminal for running both frontend and backend
Use Thunder Client or Postman for testing APIs

---

### 📝 License
This project is for academic/demo purposes only.
---

### 👨‍💻 Author
Developed by Md. Noornabi

---
GitHub: @noornabi-noor
