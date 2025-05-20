const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, User } = require("../models");

const registrar = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ message: "El email ya está registrado." });

    const hash = await bcrypt.hash(password, 10);
    const User = await User.create({ name, email, password: hash });

    res.status(201).json({ message: "Usuario registrado con éxito", user: { id: user.id, name, email } });
  } catch (err) {
    res.status(500).json({ message: "Error al registrar", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ message: "Acceso concedido", token });
  } catch (err) {
    res.status(500).json({ message: "Error al iniciar sesión", error: err.message });
  }
};

module.exports = { registrar, login };
