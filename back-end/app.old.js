require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const {
  authenticateJWT,
} = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
const redis = require("redis");
const app = express();
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
    });
    console.log("MongoDB conectado com sucesso!");
  } catch (err) {
    console.error("Erro na conexão com MongoDB:", err);
  }
}

connectToMongoDB();

// Conexão com Redis

const redisClient = redis.createClient({
  url: process.env.REDIS_URL, // ou a URL de conexão do Redis
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("Conectado ao Redis com sucesso!");
})();

app.set("redisClient", redisClient);

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Faça login para continuar." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido." });
    }
    req.user = user;
    next();
  });
}

app.get("/pages/todo-app.html", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "pages/todo-app.html"));
});

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticateJWT, taskRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
