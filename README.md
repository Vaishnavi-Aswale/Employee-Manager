# EmpManager

## Project Setup

### Prerequisites
- Node.js (v16 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

---

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Vaishnavi-Aswale/Employee-Manager.git
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


## (Alternative)

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
In the Mongo URI add- username, password(if password contain '@' then replace with %40), database name
MONGO_URI="mongodb+srv://username:password@vacluster.dbgxuow.mongodb.net/DATABASENAME?retryWrites=true&w=majority&appName=VACluster"
PORT=5001
```

## Sample .env file for Client
```env
REACT_APP_BACKEND_URL=http://localhost:5001
```


