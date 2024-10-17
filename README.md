# User Authentication and Access Tracking System Frontend

![Red Canary Logo](./red-canary-logo.png)

## Project Overview

This repository contains the frontend of the "User Authentication and Access Tracking System with Database Integration and Email Alerts" project, developed for the Red Canary Software Engineer Take-Home Exam. The frontend is built using ReactJS and interacts with the backend services to provide user sign-up, sign-in, and access tracking functionalities.

### Technologies Used

- **ReactJS** - For building the user interface.
- **React Router** - To manage client-side navigation.
- **CSS, Bootstrap & styled-components** - For styling the application.
- **Jest & React Testing Library** - For unit and integration testing. *(Not yet implemented)*

## Contents
- [Deployed App Access](#deployed-app-access)
- [GitHub Repositories](#github-repositories)
- [Features](#features)
- [Installation and Setup](#installation-and-setup)
- [Folder Structure](#folder-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Conclusion](#conclusion)
- [License](#license)
- [Contact](#contact)

## Deployed App Access
- **Deployed App on Netlify**: [Application](https://redcanary-securelogin-test.netlify.app/) 
- **Deployed Server on Render**: [Server](https://red-canary-takehome-be.onrender.com/)

## GitHub Repositories
- [FrontEnd](https://github.com/jorammercado/red-canary-takehome-fe)
- [BackEnd](https://github.com/jorammercado/red-canary-takehome-be)

## Features

### User Authentication

- **Sign-Up Page:** Users can create new accounts by filling out the required information.
- **Sign-In Page:** Users can sign in to access the application.
- **Password Management:** Users can reset and update their passwords. *(Not yet implemented)*
- **Account Lock Notification:** Users are notified if their account has been locked due to failed login attempts. *(Not yet implemented)*
- **Multi-Factor Authentication (MFA):** Additional security layer for users during sign-in. *(Not yet implemented)*

### Access Tracking *(Not yet implemented)*

- **Failed Login Alerts:** Notify users when multiple failed login attempts are detected on their account. *(Not yet implemented)*
- **New Browser Login Alerts:** Notify users when their account is accessed from a new browser or device. *(Not yet implemented)*

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/red-canary-takehome-fe.git
   cd red-canary-takehome-be.git
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

## Folder Structure

- **src/components** - Contains reusable components such as forms, buttons, and alerts.
- **src/pages** - Contains the main pages of the application such as SignUp, SignIn, and Home.
<!-- - **src/services** - Contains utility functions for making API calls. -->

## Testing *(Not yet implemented)*

Testing is an important part of the application to ensure it behaves as expected and meets requirements. This project includes the following tests:

### Unit Testing *(Not yet implemented)*

- **Components:** Ensure individual components work as expected.
- **Utilities:** Test functions used in API calls and other logic.

### Integration Testing *(Not yet implemented)*

- Test interactions between components and services.

To run tests:
```sh
npm test
```

## Deployment

The frontend can be deployed using services such as **Netlify**, **Vercel**, or **GitHub Pages**. Deployment instructions for Netlify are provided below:

1. Create a new site on Netlify.
2. Connect the GitHub repository to Netlify.
3. Configure build settings:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `build`
4. Deploy the site.

## Conclusion

This project focuses on building a user-friendly and secure frontend for the authentication and access tracking system. The goal was to provide a smooth user experience while ensuring proper security measures were in place to protect user data.


## License
This project is licensed under the MIT License. See the [LICENSE](https://opensource.org/license/mit) file for details.

## Contact
For any inquiries or feedback, please contact:

- Joram Mercado: [GitHub](https://github.com/jorammercado), [LinkedIn](https://www.linkedin.com/in/jorammercado)

