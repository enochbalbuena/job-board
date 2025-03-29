const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');

const jobRoutes = require('./routes/jobsRoutes');
const clientRoutes = require('./routes/clientsRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');
const swaggerDocs = require('./swagger');
require('./config/passportConfig');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Session & Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false // Set to true in production with HTTPS
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Debug logging for every request
app.use((req, res, next) => {
  console.log('Incoming request session:', req.session);
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/clients', clientRoutes);

// Swagger
swaggerDocs(app);

// Error Handler
app.use(errorHandler);

// DB + Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
