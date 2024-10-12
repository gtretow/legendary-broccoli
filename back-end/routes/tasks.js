const express = require("express");
const { body, validationResult } = require("express-validator");
const Task = require("../models/Task");

const router = express.Router();

// Adicionar nova tarefa
router.post(
  "/",
  [
    body("taskItem")
      .not()
      .isEmpty()
      .withMessage("Título é requerido")
      .trim()
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { taskItem } = req.body;
    try {
      const task = new Task({
        user: req.user._id,
        taskItem,
      });
      await task.save();

      // Atualizar cache no Redis
      const redisClient = req.app.get("redisClient");
      await redisClient.del(`tasks_${req.user._id}`);

      res.status(201).json(task);
    } catch (err) {
      console.error("Erro adição de tarefa:", err);
      res.status(500).json({ message: "Erro no servidor" });
    }
  }
);

// Listar todas as tarefas
router.get("/", async (req, res) => {
  try {
    const redisClient = req.app.get("redisClient");
    const cacheKey = `tasks_${req.user._id}`;
    const cachedTasks = await redisClient.get(cacheKey);

    if (cachedTasks) {
      return res.json(JSON.parse(cachedTasks));
    }

    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(tasks));
    res.json(tasks);
  } catch (err) {
    console.error("Erro de listagem de tarefa:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

// Atualizar título de uma tarefa
router.put(
  "/:id",
  [body("taskItem").notEmpty().withMessage("A terafa não pode estar vazia")],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { taskItem } = req.body;
    try {
      let task = await Task.findOne({ _id: req.params.id, user: req.user._id });
      if (!task) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      task.taskItem = taskItem;
      await task.save();

      // Atualizar cache no Redis
      const redisClient = req.app.get("redisClient");
      await redisClient.del(`tasks_${req.user._id}`);

      res.json(task);
    } catch (err) {
      console.error("Erro de atualização de tarefa:", err);
      res.status(500).json({ message: "Erro no servidor" });
    }
  }
);

// Remover uma tarefa
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    // Atualizar cache no Redis
    const redisClient = req.app.get("redisClient");
    await redisClient.del(`tasks_${req.user._id}`);

    res.json({ message: "Tarefa removida" });
  } catch (err) {
    console.error("Erro de remoção de tarefa:", err);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

module.exports = router;
