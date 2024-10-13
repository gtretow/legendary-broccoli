require("dotenv").config();
const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log("MongoDB conectado com sucesso!");
  } catch (err) {
    console.error("Erro na conexão com MongoDB:", err);
    process.exit(1);
  }
};

module.exports = { connectToMongoDB };
