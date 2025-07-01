const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/employees', employeeRoutes);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
}).catch((err) => console.log(err));
