const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/HospitalManagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
