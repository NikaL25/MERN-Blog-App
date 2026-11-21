
# 📝 MERN Blog App

A full-stack blogging platform built with the MERN stack. Users can create accounts, publish posts with images, explore articles, and interact through comments.

## 🌐 Live Demo

[**View Live Demo**](https://mern-blog-app-tau-weld.vercel.app/)

## ✨ Features

- User registration and authentication
- Create, edit, and delete blog posts
- Upload images using Cloudinary
- Browse recent and popular posts
- View individual posts and reading statistics
- Add, edit, and delete comments
- View personal posts
- Responsive design

## 🛠️ Tech Stack

| Frontend | Backend | Database & Services |
|---|---|---|
| React 19 | Node.js | MongoDB Atlas |
| Redux Toolkit | Express 5 | Mongoose |
| React Router | JWT | Cloudinary |
| Axios | bcryptjs | Vercel |
| Tailwind CSS | | Render |

## 📁 Project Structure

```text
MERN-Blog-App/
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── utils/
│       ├── App.js
│       └── index.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── index.js
│
└── README.md
```

## ⚙️ Installation

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account
- Cloudinary account

### 1. Clone the repository

```bash
git clone https://github.com/NikaL25/MERN-Blog-App.git
cd MERN-Blog-App
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=3001
JWT_SECRET=your_jwt_secret

DB_USER=your_mongodb_user
DB_PASSWORD=your_mongodb_password
DB_NAME=your_database_name

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (optional):

```env
REACT_APP_API_URL=http://localhost:3001/api
```

Start the frontend:

```bash
npm start
```

The application will be available at:

http://localhost:3000

## 🚀 Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| Image Storage | Cloudinary |

## 📄 License

This project is available for personal and educational use.
