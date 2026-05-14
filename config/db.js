const mongoose = require("mongoose");

function connectToDb() {
  return mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  }).then(() => {
    console.log("connected to database");
  }).catch((err) => {
    console.log("error connecting to database", err);
  });
}

module.exports = connectToDb;