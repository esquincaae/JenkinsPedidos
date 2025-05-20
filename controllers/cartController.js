const { Carrito, Producto, CarritoProducto } = require("../models");

const verCarrito = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({
      where: { usuarioId: req.usuarioId },
      include: { model: Producto, through: { attributes: ["cantidad"] } }
    });
    res.json(carrito || { mensaje: "Carrito vacío" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al obtener carrito", error: err.message });
  }
};

const agregarProducto = async (req, res) => {
  try {
    const { productoId, cantidad } = req.body;
    let carrito = await Carrito.findOne({ where: { usuarioId: req.usuarioId } });
    if (!carrito) carrito = await Carrito.create({ usuarioId: req.usuarioId });

    let item = await CarritoProducto.findOne({
      where: { carritoId: carrito.id, productoId }
    });

    if (item) {
      item.cantidad += cantidad;
      await item.save();
    } else {
      await CarritoProducto.create({ carritoId: carrito.id, productoId, cantidad });
    }

    res.json({ mensaje: "Producto agregado al carrito" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al agregar al carrito", error: err.message });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { productoId } = req.body;
    const carrito = await Carrito.findOne({ where: { usuarioId: req.usuarioId } });
    if (!carrito) return res.status(404).json({ mensaje: "Carrito no encontrado" });

    await CarritoProducto.destroy({ where: { carritoId: carrito.id, productoId } });
    res.json({ mensaje: "Producto eliminado del carrito" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al eliminar del carrito", error: err.message });
  }
};

module.exports = { verCarrito, agregarProducto, eliminarProducto };
