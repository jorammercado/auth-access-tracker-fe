# User Authentication and Access Tracking System Frontend

## 📝 Project Overview

This repository contains the **frontend** of the **User Authentication and Access Tracking System with Database Integration and Email Alerts** project. Built with **ReactJS**, the frontend interacts with backend services to provide user sign-up, sign-in, and access tracking functionalities.

> 📌 For details on security features and backend development, see the [backend README](https://github.com/jorammercado/auth-access-tracker-be/blob/main/README.md).

### 🚀 Technologies Used

* **ReactJS** – For building the user interface
* **React Router** – Manages client-side navigation
* **CSS, Bootstrap & styled-components** – Styling the application
* **jwt-decode** – Decodes JSON Web Tokens (JWT) and handles session expiration
* **SweetAlert2 (swal messaging)** – Enhanced user messaging and alert dialogs

## 📑 Contents

* [Deployed App Access](#deployed-app-access)
* [GitHub Repositories](#github-repositories)
* [Features](#features)
* [Session Management](#session-management)
* [Installation and Setup](#installation-and-setup)
* [Deployment](#deployment)
* [License](#license)
* [Contact](#contact)

## 🌐 Deployed App Access

* **Frontend (Netlify)**: [https://auth-access-tracker.netlify.app/](https://auth-access-tracker.netlify.app/)
* **Backend (Render)**: [https://auth-access-tracker-be.onrender.com/](https://auth-access-tracker-be.onrender.com/)

## 💻 GitHub Repositories

* **Frontend**: [auth-access-tracker-fe](https://github.com/jorammercado/auth-access-tracker-fe)
* **Backend**: [auth-access-tracker-be](https://github.com/jorammercado/auth-access-tracker-be)

## 🔐 Features

* **🔸 Sign-Up:** Public page where users can register new accounts.
* **🔸 Sign-In:** Public page to authenticate existing users.
* **🔸 Forgot Password:** Sends a password reset link via email.
* **🔸 Verify OTP:** Page to enter the 6-digit code sent to email.
* **🔸 Profile:** Private user dashboard displaying basic information.
* **🔸 Home:** Private informational overview of the application.
* **🔸 404 Page:** Shown for invalid routes.
* **🔸 Edit Profile:** Users can update name, image, and contact info.
* **🔸 Update Password:** Secure password change flow while logged in.

## ⏳ Session Management

Session management is handled client-side with `localStorage` + state management:

* **Login (`handleLogin`)**

  * Stores JWT and user info in state + `localStorage`
  * Decodes token to get expiration and sets logout timeout
  * Invalid tokens trigger immediate logout

* **Logout (`handleLogout`)**

  * Clears all session-related data
  * Cancels expiration timeout
  * Triggers a SweetAlert message:

    * 👋 Manual logout ➝ "You have logged out."
    * ⏱ Session timeout ➝ "Session expired. Please log in again."

This complements backend JWT verification to ensure secure sessions.

## ⚙️ Installation and Setup

1. **Clone the repo**:

   ```sh
   git clone https://github.com/your-username/auth-access-tracker-fe.git
   cd auth-access-tracker-fe
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Configure environment**:
   Create a `.env` file with:

   ```env
   VITE_API_URL=http://localhost:8899
   ```

4. **Start development server**:

   ```sh
   npm run dev
   ```

## 🚀 Deployment

Deployed on **Netlify**. You can also use **Vercel** or **GitHub Pages**.

### 🔧 Netlify Setup

1. Connect repo
2. Build settings:

   * Build command: `npm run build`
   * Publish directory: `dist`
3. Add env variable:

   * `VITE_API_URL = https://auth-access-tracker-be.onrender.com`
4. Deploy ✅

## 📄 License

MIT License. See [LICENSE](https://opensource.org/license/mit) for more details.

## 📬 Contact

* **Joram Mercado**: [GitHub](https://github.com/jorammercado) | [LinkedIn](https://www.linkedin.com/in/jorammercado)
