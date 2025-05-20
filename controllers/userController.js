const { Usuario } = require("../models");

const perfil = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuarioId, {
      attributes: ["id", "nombre", "email"]
    });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    res.json(usuario);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener perfil", error: err.message });
  }
};

module.exports = { perfil };
