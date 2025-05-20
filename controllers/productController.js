const { Producto } = require("../models");

const listarProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener productos", error: err.message });
  }
};

const obtenerProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

    res.json(producto);
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener producto", error: err.message });
  }
};

module.exports = { listarProductos, obtenerProducto };
