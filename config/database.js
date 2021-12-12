
// Database connection
const mongoose = require("mongoose");
const db = "mongodb://localhost/cmscart";
mongoose.Promise = global.Promise;

async function connectDB() {
  try {
    await mongoose.connect(db, {
      useMongoClient: true,
    });

    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDB;