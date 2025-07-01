# EmpManager

## Project Setup

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

---

## How to Run the Application

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd employee-manager
```

### 2. Setup Environment Variables for the Server
Create a `.env` file inside the `server` directory with the following content:

```env
MONGO_URI=your MongoDB Atlas connection string
PORT=5000
```

- Replace the `MONGO_URI` value with your actual MongoDB URI if using MongoDB Atlas.

---

### 3. Install Dependencies & Run the Server
```bash
cd server
npm install
npm run dev
```
The server will start on the port you set in your `.env` file.

---

### 4. Install Dependencies & Run the Client
```bash
cd ../client
npm install
npm start
```
The client will start on `http://localhost:3000` by default.

---

## Additional Notes
- The client expects the server URL to be set in the `REACT_APP_BACKEND_URL` environment variable (see below).
- Uploaded files are stored in the `server/uploads` directory.
- Make sure MongoDB is running before starting the server.

---

## Sample .env file for Server
```env
MONGO_URI=mongodb://localhost:27017/empmanager
PORT=5000
```


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Sample .env file for Client
```env
REACT_APP_BACKEND_URL=http://localhost:5001
```

