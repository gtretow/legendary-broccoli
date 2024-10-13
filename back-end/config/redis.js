require("dotenv").config();
const redis = require("redis");

redisClient = redis.createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

const connectToRedis = async (app) => {
  try {
    await redisClient.connect();
    app.set("redisClient", redisClient);

    console.log("Conectado ao Redis com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao Redis:", error);
    process.exit(1);
  }
};

module.exports = { connectToRedis };
