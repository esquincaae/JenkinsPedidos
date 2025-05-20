const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usuario } = require("../models");

const registrar = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ mensaje: "El email ya está registrado." });

    const hash = await bcrypt.hash(contraseña, 10);
    const usuario = await Usuario.create({ nombre, email, contraseña: hash });

    res.status(201).json({ mensaje: "Usuario registrado con éxito", usuario: { id: usuario.id, nombre, email } });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al registrar", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

    const valid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!valid) return res.status(401).json({ mensaje: "Contraseña incorrecta" });

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ mensaje: "Acceso concedido", token });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al iniciar sesión", error: err.message });
  }
};

module.exports = { registrar, login };
