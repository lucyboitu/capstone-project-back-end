const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // ✅ no trailing slash
  credentials: true,
}));
app.use(express.json());
// const cookieParser = require('cookie-parser');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 8081, () => {
      console.log(`Server running on port ${process.env.PORT || 8081}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });


  app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(err.status || 500).json({ error: err.message });
});
