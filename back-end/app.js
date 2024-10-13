require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const { authenticateJWT } = require("./middleware/authMiddleware");
const { connectToMongoDB } = require("./config/db");
const { connectToRedis } = require("./config/redis");
const app = express();
const corsOptions = {
  origin: "https://gtretow.github.io",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

connectToMongoDB();
connectToRedis(app);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticateJWT, taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
