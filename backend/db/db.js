const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: ON");
  } catch (err) {
    console.log("Error connectong to MongoDB", err);
    throw new Error("Error connectong to MongoDB");
  }
};

module.exports = { dbConnection };
