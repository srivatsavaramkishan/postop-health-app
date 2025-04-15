const express = require('express');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctors', doctorRoutes);

const medicationRoutes = require('./routes/medicationRoutes');
app.use('/api/medications', medicationRoutes);

const followupRoutes = require('./routes/followupRoutes');
app.use('/api/followups', followupRoutes);

const observationRoutes = require('./routes/observationRoutes');
app.use('/api/observations', observationRoutes);

const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);

// Default API Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request to ${req.url}`);
  next();
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
