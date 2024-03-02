const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    const conenct = await mongoose.connect(process.env.MONGO_URI, {});

    console.log(`MongoDB connected: ${conenct.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
