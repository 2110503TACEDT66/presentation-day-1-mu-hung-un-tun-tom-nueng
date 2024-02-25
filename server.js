const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
// const company = require('./routes/companyRoutes');
// const session = require('./routes/sessionRoutes');
// const user = require('./routes/userRoutes');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);

// eslint-disable-next-line
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
