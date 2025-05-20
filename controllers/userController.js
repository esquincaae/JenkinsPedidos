const { User } = require("../models");

const perfil = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "name", "email"]
    });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener perfil", error: err.message });
  }
};

module.exports = { perfil };
