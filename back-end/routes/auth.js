const express = require("express");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post(
  "/register",
  [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Usuário deve ter pelo menos 3 caracteres"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter pelo menos 6 caracteres"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let user = await User.findOne({ username });
      if (user) {
        return res.status(400).json({ message: "Usuário já existe" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ username, password: hashedPassword });
      await user.save();

      const payload = { id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({ token });
    } catch (err) {
      console.error("Erro durante o registro:", err);
      res
        .status(500)
        .json({ message: "Erro no servidor. Tente novamente mais tarde." });
    }
  }
);

router.post(
  "/login",
  [
    body("username").exists().withMessage("Usuário é requerido"),
    body("password").exists().withMessage("Senha é requerida"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      if (!user) {
        return res.status(400).json({ message: "Credenciais inválidas" });
      }

      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Credenciais inválidas" });
      }

      const payload = { id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (err) {
      console.error("Erro durante o login:", err);
      res.status(500).json({ message: "Erro no servidor" });
    }
  }
);

module.exports = router;
