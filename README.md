# User Authentication and Access Tracking System Frontend

## Project Overview

This repository contains the frontend of the **User Authentication and Access Tracking System with Database Integration and Email Alerts** project. Built with ReactJS, the frontend interacts with backend services to provide user sign-up, sign-in, and access tracking functionalities. For details on security features and backend development, see the [backend README](https://github.com/jorammercado/auth-access-tracker-be/blob/main/README.md).

### Technologies Used

- **ReactJS** - For building the user interface
- **React Router** - To manage client-side navigation
- **CSS, Bootstrap & styled-components** - For styling the application
- **jwt-decode** - To decode JSON Web Tokens (JWT) and handle session expiration
- **SweetAlert2 (swal messaging)** - For enhanced user messaging and alert dialogs

## Contents
- [Deployed App Access](#deployed-app-access)
- [GitHub Repositories](#github-repositories)
- [Features](#features)
- [Session Management](#session-management)
- [Installation and Setup](#installation-and-setup)
- [Deployment](#deployment)
- [License](#license)
- [Contact](#contact)

## Deployed App Access
- **Deployed App on Netlify**: [Application](https://auth-access-tracker.netlify.app/)
- **Deployed Server on Render**: [Server](https://auth-access-tracker-be.onrender.com/)

## GitHub Repositories
- [Frontend - auth-access-tracker-fe](https://github.com/jorammercado/auth-access-tracker-fe)
- [Backend - auth-access-tracker-be](https://github.com/jorammercado/auth-access-tracker-be)

## Features

- **Sign-Up:** Public page where users can create new accounts by filling out required information, such as name, email, and password.

- **Sign-In:** Public page where users can sign in to access the application using their registered credentials.

- **Forgot Password:** Public page that allows users to reset their password by receiving a password reset link via email.

- **Verify OTP:** Public page where users enter the one-time password (OTP) sent to their email to complete the login process.

- **Profile:** Private page that acts as a user portal, displaying the user's information and settings.

- **Home:** For the purposes of this project, a private page that provides general information about the site, including an overview of key features.

- **404:** Public page displayed when a user navigates to a non-existent URL, indicating the requested page could not be found.

- **Edit Profile:** Private page that allows users to update their personal information, such as their name, profile picture, and contact details.

- **Update Password:** Private page where users can securely update their password after logging in.

## Session Management

Session management in this application is handled on the client-side using state management in combination with `localStorage` to store the authentication token. The session is monitored, and upon expiry, users are logged out automatically. Here's an overview of the implementation:

- **Session State Management**:
  - The state `currentUser` stores the information about the logged-in user, while `token` is used to store the JWT authentication token.
  - The `token` is also saved in `localStorage` to persist the session across page reloads.
  
- **Login Process (`handleLogin` function)**:
  - When a user logs in, `handleLogin` updates the `currentUser` and `token` state.
  - It decodes the JWT to determine the expiration time and sets a timeout to automatically log the user out once the token expires.
  - If the token is invalid, the user is logged out immediately.
  
- **Logout Process (`handleLogout` function)**:
  - Clears the `currentUser` and `token` from state and removes the token from `localStorage`.
  - Cancels any active timeouts that were set to automatically log the user out after token expiration.
  - Displays appropriate messages using `Swal`, with messaging tailored to the type of logout event. For manual logouts, users see a confirmation message indicating they have logged out successfully. For session timeouts, users are notified that their session has expired due to inactivity and they need to log in again.

This client-side approach, combined with secure backend JWT verification, helps ensure users have consistent and secure sessions while using the application.


## Installation and Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/auth-access-tracker-fe.git
   cd auth-access-tracker-fe
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables by creating a `.env` file:
   ```sh
   VITE_API_URL=http://localhost:8899
   ```

4. Run the application:
   ```sh
   npm run dev
   ```

## Deployment

The frontend can be deployed using services such as **Netlify**, **Vercel**, or **GitHub Pages**. Easy deployment instructions for Netlify are provided below. For Vercel and GitHub Pages, the general process is similar; refer to their official docs for details.

1. Create a new site on Netlify.
2. Connect the GitHub repository to Netlify.
3. Configure build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Add an environment variable in the Netlify settings:
   - **Key:** `VITE_API_URL`
   - **Value:** URL of your deployed backend server (e.g., `https://auth-access-tracker-be.onrender.com`)
5. Deploy the site.


## License
This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.

## Contact
For any inquiries or feedback, please contact:

- Joram Mercado: [GitHub](https://github.com/jorammercado), [LinkedIn](https://www.linkedin.com/in/jorammercado)