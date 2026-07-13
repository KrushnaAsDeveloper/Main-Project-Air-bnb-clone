# 🌥️ CosyCloud

A full-stack Airbnb-inspired property booking platform built with the MERN stack, featuring secure authentication, image uploads, and listing management.

## 📖 About

CosyCloud is a property rental and booking web application where users can browse listings, create accounts, list their own properties, and manage bookings — inspired by platforms like Airbnb. Built as a hands-on project to master full-stack development: REST API design, JWT authentication, file upload pipelines, and cloud deployment.

## ✨ Features

- 🔐 **User Authentication** — Secure register/login with JWT-based auth and hashed passwords (bcrypt)
- 🏠 **Property Listings** — Create, view, update, and delete property listings
- 🖼️ **Image Uploads** — Upload listing photos via Multer + Cloudinary integration
- 👤 **Ownership Authorization** — Users can only edit or delete their own listings
- 🔎 **Browse & Search** — View all available listings on the platform
- 📱 **Responsive UI** — Built with Tailwind CSS for a clean experience across devices

## 🛠️ Tech Stack

**Frontend**
- React 19
- React Router DOM
- Tailwind CSS v4
- Axios
- FontAwesome

**Backend**
- Node.js & Express
- MongoDB & Mongoose
- JWT (jsonwebtoken) for authentication
- bcryptjs for password hashing
- Multer + Cloudinary for image storage

**Deployment**
- Frontend hosted on **Vercel**
- Backend hosted on **Render**

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB instance)
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/<your-username>/cosy_cloud.git
   cd cosy_cloud
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables

   Create a `.env` file in the backend directory:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   PORT=5000
   ```

4. Run the development server
   ```bash
   npm run dev
   ```

5. Open the app at `http://localhost:5173`

## 📂 Project Structure

```
cosy_cloud/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   └── main.jsx
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
└── ...
```

## 📌 Roadmap

- [ ] Booking/reservation system
- [ ] Reviews & ratings
- [ ] Search filters (location, price, dates)
- [ ] Desktop app packaging (Electron)

## 👨‍💻 Author

**Krushna** — MERN Stack Developer  
BSc Computer Science, Satish Pradhan Dnyanasadhana College

## 📄 License

This project is open source and available under the [MIT License](LICENSE).