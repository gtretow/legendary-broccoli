const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token inválido" });
    }
  } else {
    res.status(401).json({ message: "Autenticação requerida" });
  }
};
