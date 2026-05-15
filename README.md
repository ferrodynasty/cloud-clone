# ☁️ CloudClone

A full-stack cloud storage web app inspired by Google Drive.
Upload, view, and delete files from anywhere — stored securely on Cloudinary.

## 🚀 Features
- User registration & login with JWT authentication
- Secure password hashing with bcrypt
- Upload files (PDF, PNG, JPG, MP4, ZIP, DOCX)
- View all your uploaded files
- Delete files from cloud storage
- Protected routes — only logged-in users can access files

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Storage:** Cloudinary
- **Auth:** JWT + bcrypt
- **Views:** EJS + Tailwind CSS

## ⚙️ Setup
1. Clone the repo
2. Run `npm install`
3. Create a `.env` file with your credentials:
4. MONGODB_URI=your_mongodb_uri
SECRET_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
## Run
4. Run `node app.js`
5. Visit `http://localhost:3000/home`
