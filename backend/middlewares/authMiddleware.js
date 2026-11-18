const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verificarToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Debes iniciar sesión" });
  }

  const token = authorization.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findById(payload.id);

    if (!usuario) {
      return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }

    req.user = usuario;
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(401).json({ mensaje: "Token inválido o vencido" });
    }

    return next(error);
  }
};

module.exports = verificarToken;