# Hostinger Deployment Guide

This guide describes how to deploy the React frontend and Node.js backend of **TheContractum** on Hostinger.

We have provided an automated script that builds the frontend and packages both applications into two ZIP archives located in the root of the workspace:
1. `frontend_build.zip` - Contains the static HTML/JS/CSS files along with routing configuration.
2. `backend_upload.zip` - Contains the Node.js Express server source files (excluding `node_modules` and local environment files).

---

## 📋 Prerequisites
1. A Hostinger hosting plan (Shared, Cloud, or VPS) with **Node.js Selector** support (standard on most Hostinger plans).
2. A domain name (e.g. `thecontractum.com`) pointing to your Hostinger server.
3. A MongoDB Atlas database instance (the server connects remotely).

---

## 🛠️ Step 1: Run the Build and Packaging Script
Run the packaging command from the root directory of the project:
```bash
npm run build:hostinger
```
This script will:
- Build your React frontend using production settings.
- Ensure that the `.htaccess` file is copied to the build.
- Create `frontend_build.zip` and `backend_upload.zip` in your root directory.

---

## 🌐 Step 2: Deploy the Frontend (React Vite Build)
The React build consists of static files that should be uploaded to the root web folder of your main domain.

1. Log in to your **Hostinger hPanel**.
2. Go to **Files** -> **File Manager**.
3. Navigate to the `public_html` directory of your domain (e.g. `public_html/`).
4. Upload the `frontend_build.zip` file.
5. Right-click the uploaded ZIP file and select **Extract**. Extract the files directly into the `public_html` folder.
6. Delete the `frontend_build.zip` file after extraction to keep your directory clean.

### 📝 Important: React Router Configuration
React Router uses client-side routing. The extracted files include a `.htaccess` file which handles this:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^api(/|$) - [L]
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```
If you encounter `404 Not Found` errors when reloading subpages (like `/login` or `/admin`), make sure this `.htaccess` file exists in the root of your `public_html` directory.

---

## 🚀 Step 3: Deploy the Backend (Node.js API)
Hostinger runs Node.js applications using Phusion Passenger. You must set up a Node.js Application in the hPanel.

### 1. Create the Node.js Application
1. In hPanel, search for **Node.js** in the search bar or go to **Advanced** -> **Node.js**.
2. Click **Create Application**.
3. Configure the following fields:
   - **App Directory**: Enter a path outside or inside `public_html` where your backend files will reside (e.g., `api` or `backend`). If you enter `api`, the folder will be created.
   - **App Domain**: Select your subdomain (e.g. `api.thecontractum.com`) or domain.
   - **App Entry File**: Enter `index.js`.
   - **Node.js Version**: Select the latest stable version (e.g. `18.x` or `20.x`).
4. Click **Create**.

### 2. Upload and Extract Backend Files
1. Open the **File Manager** and navigate to the directory you specified for the Node.js app (e.g., `api/`).
2. Upload the `backend_upload.zip` file.
3. **Extract** the files directly into this directory.
4. Delete the `backend_upload.zip` file.

### 3. Install Dependencies
1. Go back to the **Node.js** settings page in hPanel.
2. Find your application and click **Run npm install** or **Install Dependencies**. This will fetch all packages listed in `package.json` natively for Hostinger's environment.

---

## ⚙️ Step 4: Configure Environment Variables
You need to set up your database, secrets, and CORS domains.

1. In the **Node.js** application dashboard, you can add environment variables, OR you can create a `.env` file in your application directory using the File Manager.
2. Create/edit the `.env` file in the backend root directory (`api/.env` or `backend/.env`) with the following values:
   ```env
   PORT=5000 # Managed by Hostinger/Passenger, but good to have
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secure_jwt_secret
   RECAPTCHA_SECRET_KEY=your_recaptcha_key
   DEFAULT_ADMIN_PASSWORD=your_secure_admin_password

   # Email Settings
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ADMIN_EMAIL=info@thecontractum.com

   # CORS Configuration
   FRONTEND_URL=https://thecontractum.com # Replace with your actual frontend domain
   ```
3. Save the file.
4. Restart your Node.js application from the hPanel dashboard to apply the configuration.

---

## 💡 Troubleshooting & Hostinger Specific Tips

### 😴 1. Prevent the Backend from "Going to Sleep"
Hostinger's shared hosting Node.js server automatically puts applications to sleep if there are no incoming requests for a period of time. This can cause the following issues:
- **First request latency**: The first visitor after a period of inactivity experiences a slow response (5-10 seconds) while the app boots.
- **Failed Cron Jobs**: The scheduled database backups and automated report crons in `backend/utils/backup.js` and `backend/utils/reports.js` will *not* trigger if the application is asleep.

**Solution:**
Create a Cron Job in Hostinger hPanel (**Advanced** -> **Cron Jobs**) that pings your API's health check endpoint every 5 minutes to keep it active:
- **Command:** `curl -s https://api.thecontractum.com/api/health > /dev/null`
- **Interval:** Once every 5 minutes (`*/5 * * * *`)

### 📂 2. File Upload Directory Permissions
Ensure that the Node.js application has write permissions for the uploads directory. When a user uploads files (such as certificates, profile images, or resumes), Express will automatically create directory subfolders under `/uploads`.
If uploads fail with a permission error:
- Go to **File Manager**.
- Right-click the `uploads/` folder (if it exists, or create an empty one).
- Select **Permissions** and ensure that it is set to `755` or writeable by the owner.

### 🔄 3. Restarting the Application After Code Changes
Unlike a development server, Node.js applications hosted on Hostinger do not automatically reload when files change. If you upload updates, you must go to **Node.js** in hPanel and click **Restart Application** for changes to take effect.
Alternatively, creating/touching a file named `tmp/restart.txt` in your application folder will trigger Passenger to restart the app on the next HTTP request.
