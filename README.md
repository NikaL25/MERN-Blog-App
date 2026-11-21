📝 MERN Blog App

A full-stack blogging platform built with the MERN stack, allowing users to create, manage, and explore blog posts with images and comments.

🌐 Live Demo
View Live [Demo](https://mern-blog-app-tau-weld.vercel.app/)

Deployed on Vercel.

✨ Features
🔐 User registration and authentication
📰 Create, edit, and delete posts
🖼️ Upload images using Cloudinary
🔥 Browse popular and recent posts
💬 Add, edit, and delete comments
👤 View personal posts
📱 Responsive user interface
🛠️ Tech Stack
Frontend Backend Services
React 19 Node.js MongoDB Atlas
Redux Toolkit Express 5 Cloudinary
React Router Mongoose Vercel
Axios JWT Render
Tailwind CSS bcryptjs
📁 Project Structure
text
MERN-Blog-App/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── redux/
│ └── utils/
│
├── server/ # Express backend
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ └── index.js
│
└── README.md

⚙️ Installation & Setup

1. Clone the repository

bash
```
git clone https://github.com/NikaL25/MERN-Blog-App.git
cd MERN-Blog-App
``` 

2. Set up the backend

bash
cd server
npm install

Create a .env file in the server directory:

env
PORT=3001
JWT_SECRET=your_jwt_secret

DB_USER=your_mongodb_user
DB_PASSWORD=your_mongodb_password
DB_NAME=your_database_name

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Start the backend:

bash
npm run dev

3. Set up the frontend

Open a new terminal:

bash
cd client
npm install

Create a .env file in the client directory (optional):

env
REACT_APP_API_URL=http://localhost:3001/api

Start the frontend:

bash
npm start

🚀 Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas
Image Storage: Cloudinary
📄 License

This project is open-source and available for personal and educational use.
