const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const roomRoutes = require('./routes/roomRoutes'); // Import room routes
const reservationRoutes = require('./routes/reservationRoutes');
const cors = require('cors');

const app = express();
const PORT = 3002||3003;
const DB_URI = 'mongodb://127.0.0.1:27017/romm_reservation';

// Connect to MongoDB
mongoose.connect(DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.json()); // Middleware for parsing JSON
const corsOptions = {
  origin: '*', // Allow all origins
};

  
  app.use(cors(corsOptions));
// Use user routes
app.use('/users', userRoutes); // All routes for users start with /users
app.use('/rooms', roomRoutes);
app.use('/reservations', reservationRoutes);
// app.use(cors());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports=app;