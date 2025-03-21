const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jobRoutes = require('./routes/jobsRoutes');
const clientRoutes = require('./routes/clientsRoutes');
const errorHandler = require('./middleware/errorHandler');
const swaggerDocs = require('./swagger');
const cors = require('cors');


dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/clients', clientRoutes);

swaggerDocs(app);

// Error Handler
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
