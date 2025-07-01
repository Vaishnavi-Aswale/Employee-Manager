# EmpManager

## Project Setup

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

---

## Quick Start (Recommended)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd employee-manager
```

### 2. Install All Dependencies
```bash
npm run install-all
```

### 3. Setup Environment Variables

**For Server** - Create `server/.env`:
```env
MONGO_URI=your MongoDB Atlas connection string
PORT=5001
```

**For Client** - Create `client/.env`:
```env
REACT_APP_BACKEND_URL=http://localhost:5001
```

### 4. Start Both Server and Client from root
```bash
npm run dev
```

This will start:
- **Server** on `http://localhost:5001`
- **Client** on `http://localhost:3000`

---

## Available Scripts

From the root directory, you can run:

| Command | Description |
|---------|-------------|
| `npm run install-all` | Install dependencies for root, server, and client |
| `npm run dev` | Start both server and client in development mode |
| `npm run server` | Start only the server |
| `npm run client` | Start only the client |
| `npm run build` | Build the client for production |
| `npm start` | Start only the server in production mode |

---

## Manual Setup (Alternative)

If you prefer to run server and client separately:

### Server Setup
```bash
cd server
npm install
npm run dev
```

### Client Setup
```bash
cd client
npm install
npm start
```

---

## Additional Notes
- The client expects the server URL to be set in the `REACT_APP_BACKEND_URL` environment variable.
- Uploaded files are stored in the `server/uploads` directory.
- Make sure MongoDB is running before starting the server.

---

## Sample .env file for Server
```env
MONGO_URI=mongodb://localhost:27017/empmanager
PORT=5001
```

## Sample .env file for Client
```env
REACT_APP_BACKEND_URL=http://localhost:5001
```


