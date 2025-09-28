require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',      // local React dev
  'https://your-vercel-domain.vercel.app'  // Vercel frontend URL
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // allow cookies
}));


const userRoutes = require('./routes/user');
const feedbackRoutes = require('./routes/feedback');

app.use('/api', userRoutes);
app.use('/api', feedbackRoutes);

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/Feedbackapp';
mongoose.connect(MONGO)
  .then(() => console.log('MongoDB started'))
  .catch(err => console.error(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started at ${port}`));
