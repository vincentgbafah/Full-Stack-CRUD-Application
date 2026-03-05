const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./src/config/db');
const taskRoutes = require('./src/routes/taskRoutes');
const { notFound, errorHandler } = require('./src/middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Task Manager API is running' });
});

app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
