<h1>Creative Showcase</h1>

Creative Showcase is a full-stack web application built with the MERN stack (MongoDB Atlas, Express, React, Node.js). It features a masonry image grid, user authentication, a private dashboard for image management, and public user profiles.

<h2>Features</h2>

- **Masonry Layout:** visually appealing image grid.
- **User Authentication:** Secure signup and login authenticaton using JWT.
- **Image Management:** Upload and delete images from a private dashboard.
- **Public Profiles:** View other users' curated collections.
- **Responsive Design:** Optimized for various screen sizes.

<h2>Prerequisites</h2>

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance)

<h2>Installation</h2>

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/dinabandhu2004/Creative-Showcase.git
    cd Creative-Showcase
    ```

2.  **Install Backend Dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install Frontend Dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

<h2>Configuration</h2>

1.  **Backend Environment Variables:**

    Create a `.env` file in the `backend` directory and add the following:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

    *Note: Replace `your_mongodb_connection_string` and `your_jwt_secret_key` with your actual credentials.*

<h2>Running the Application</h2>

### Backend

To start the backend server:

```bash
cd backend
npm start
```

The server will run on `http://localhost:5000`.

### Frontend

To start the frontend development server:

```bash
cd frontend
npm run dev
```

The frontend will usually generally run on `http://localhost:5173`.




<h2>User Guide</h2>

### 1. Getting Started
- **Access the App:** Open your browser and go to `http://localhost:5173`.
- **Landing Page:** You will see a masonry grid of random images contributed by various users. This page is public and accessible to everyone.

### 2. Account Management
- **Sign Up:**
  - Click on the "Sign Up" button in the navigation bar.
  - Enter your email and a secure password.
  - Click "Register" to create your account.
- **Log In:**
  - If you already have an account, click "Login".
  - Enter your credentials to access your private dashboard.

### 3. Dashboard (Private)
- **View Your Collection:** Once logged in, the dashboard displays only the images you have uploaded.
- **Upload Images:**
  - Click the "Upload" button or the "Plus" icon.
  - Select an image file (JPG, PNG) from your device.
  - Add a title or description if applicable.
  - Submit to add it to your collection.
- **Delete Images:**
  - Hover over an image in your dashboard.
  - Click the trash icon to permanently remove the image.

### 4. Public Profiles
- **View Profiles:** Click on a user's name on any image card in the public feed to view their specific collection.
- **Share Your Profile:** Your profile is public! You can share your profile URL with others so they can see your curated showcase.
