require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
const {
  authenticateToken,
  authenticateJWT,
} = require("./middleware/authMiddleware");
const { connectToMongoDB } = require("./config/db");
const { connectToRedis } = require("./config/redis");

const app = express();

app.use(cors());
app.use(express.json());

connectToMongoDB();

connectToRedis(app);

app.get("/pages/todo-app.html", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "pages/todo-app.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", authenticateJWT, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
