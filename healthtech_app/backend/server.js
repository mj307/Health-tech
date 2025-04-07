const express = require('express');
const cors = require('cors');
const connectDB = require('./config/Database.js');

// Load routes
const chatRoutes = require('./routes/ChatRoutes');
const calendarRoutes = require('./routes/CalendarRoutes');
const profileRoutes = require('./routes/ProfileRoutes');
const billingRoutes = require('./routes/BillingRoutes');

require("dotenv").config();
const uri = process.env.MONGODB_URI;

const app = express();

// Connect Database
connectDB;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/chats', chatRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/billing', billingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
