const { Orden, Carrito, CarritoProducto, OrdenProducto, Producto } = require("../models");

const crearOrden = async (req, res) => {
  try {
    const carrito = await Carrito.findOne({
      where: { usuarioId: req.usuarioId },
      include: { model: Producto }
    });

    if (!carrito || carrito.Productos.length === 0) {
      return res.status(400).json({ mensaje: "El carrito está vacío" });
    }

    let total = 0;
    const productosOrden = await Promise.all(carrito.Productos.map(async producto => {
      const cantidad = producto.CarritoProducto.cantidad;
      const subtotal = producto.precio * cantidad;
      total += subtotal;

      return {
        productoId: producto.id,
        cantidad,
        precioUnitario: producto.precio
      };
    }));

    const orden = await Orden.create({
      usuarioId: req.usuarioId,
      total,
      estado: "pendiente",
      fecha: new Date()
    });

    for (const item of productosOrden) {
      await OrdenProducto.create({ ...item, ordenId: orden.id });
    }

    // Vaciar carrito
    await CarritoProducto.destroy({ where: { carritoId: carrito.id } });

    res.status(201).json({ mensaje: "Orden creada con éxito", ordenId: orden.id });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al crear orden", error: err.message });
  }
};

module.exports = { crearOrden };
