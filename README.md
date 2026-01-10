# ApplySmart

ApplySmart is a modern, production-ready web application designed to help users create ATS-friendly job application documents.

This project is built with Next.js, Firebase, and Tailwind CSS, featuring AI-powered tools to optimize your job application materials.

## Core Features

- **ATS-Friendly Resume Builder**: A step-by-step wizard to create professional resumes.
- **AI Cover Letter Generator**: Generate tailored cover letters based on job descriptions.
- **Statement of Purpose (SOP) Builder**: Guided assistance for crafting compelling SOPs.
- **Job Application Toolkit**: A suite of tools to help with various parts of your application.
- **ATS Optimization Engine**: Analyze your documents for ATS compliance and get an instant score.
- **Secure Document Management**: Save, edit, and manage your documents securely.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn
- A Firebase project

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd applysmart
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    - Create a new project on the [Firebase Console](https://console.firebase.google.com/).
    - In your project's settings, add a new Web App.
    - Copy the Firebase configuration object.
    - Create a `.env.local` file in the root of your project and add your Firebase credentials:
      ```
      NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
      NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
      NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID
      ```
    - In the Firebase Console, go to **Authentication** and enable the **Email/Password** and **Google** sign-in methods.
    - Go to **Firestore Database** and create a database. Start in test mode for development, but make sure to secure your rules for production.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Deployment

This application is ready to be deployed on [Firebase Hosting](https://firebase.google.com/docs/hosting).

1.  **Install the Firebase CLI:**
    ```bash
    npm install -g firebase-tools
    ```

2.  **Login to Firebase:**
    ```bash
    firebase login
    ```

3.  **Initialize Firebase in your project:**
    ```bash
    firebase init hosting
    ```
    - Select your Firebase project.
    - Use `.next` as your public directory.
    - Configure as a single-page app (rewrite all urls to /index.html): **No**.
    - Set up automatic builds and deploys with GitHub: **(Optional)**.

4.  **Build and deploy:**
    ```bash
    npm run build
    firebase deploy
    ```
