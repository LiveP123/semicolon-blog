const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// --- הוספת הנתבים של הפוסטים ---
const postRoutes = require('./routes/posts');
app.use('/api/posts', postRoutes);

// Test Route
app.get('/api/status', (req, res) => {
  res.json({ message: 'Server is running perfectly!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});