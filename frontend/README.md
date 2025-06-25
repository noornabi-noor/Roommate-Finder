# 🏡 Roommate Finder - Client Side

This is the **client-side application** for the Roommate Finder platform, built using **React.js** and Tailwind CSS. It allows users to browse, search, and manage roommate listings, like posts, and view contact details after liking.

---

## 🌟 Features

- 🔐 **Login/Register** with Google (Firebase Auth)
- 🏠 **Home Page** with 6 featured "Available" roommate posts
- 📜 **All Listings** page – view and browse all roommate listings
- 📝 **Post a Roommate** – create a new listing
- ✏️ **Update a Post** – only for the owner
- ❌ **Delete a Post** – only for the owner
- ❤️ **Like a Roommate** – reveals contact info
- 📬 **My Posts** – view only your submitted listings
- 🔐 **Protected Routes** – only logged-in users can access certain pages

---

## Installation

To get started with **server-side application**, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Programming-Hero-Web-Course4/b11a10-client-side-noornabi-noor.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd AppsDock404
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Start the app:**
    ```bash
    npm start
    ```

5. Open your browser and go to `http://localhost:3000` to access the app.


## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- Dotenv
- JSON Web Token (JWT)

---

## 📁 Project Structure
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   ├── routes/
│   ├── App.jsx
│   ├── main.jsx
├── public/
├── .env
├── index.html
├── vite.config.js


---

## 🧪 Database Schema

```js
{
  title: String,
  location: String,
  rent: Number,
  roomType: String,
  lifestyle: [String],
  description: String,
  contact: String,
  availability: String,
  email: String,
  name: String,
  likeCount: Number
}
