# Blog App

A full-stack blog application where users can register, log in, write posts, and comment on posts.

**Live Demo:** https://blog-app-ssjt.onrender.com

> Hosted on Render's free plan, so the first load may take 30-60 seconds.

## Features
- User registration and login (JWT authentication)
- Create and view blog posts
- Comment on posts
- Admin access using an admin key
- Responsive pages (Home, Login, Write, Post)

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Mongoose)
- **Auth:** JSON Web Tokens (JWT)
- **Frontend:** HTML, CSS, JavaScript
- **Deployment:** Render, GitHub

## Project Structure
```
blog-app/
├── middleware/   # Auth middleware
├── models/       # User, Post, Comment schemas
├── public/       # Frontend pages and assets
├── routes/       # auth, posts, comments APIs
└── server.js     # App entry point
```

## Run Locally
1. Clone the repo
   ```
   git clone https://github.com/vinothinir2008/blog-app.git
   cd blog-app
   ```
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ADMIN_KEY=your_admin_key
   ```
4. Start the server
   ```
   node server.js
   ```

## Author
**Vinothini R**
Built as part of my Full Stack Development internship at Thiranex.
