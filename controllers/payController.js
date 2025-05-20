const { Pago, Orden } = require("../models");

const procesarPago = async (req, res) => {
  try {
    const { ordenId, metodo } = req.body;

    const orden = await Orden.findByPk(ordenId);
    if (!orden || orden.usuarioId !== req.usuarioId) {
      return res.status(404).json({ mensaje: "Orden no válida" });
    }

    if (orden.estado === "pagado") {
      return res.status(400).json({ mensaje: "Esta orden ya fue pagada" });
    }

    await Pago.create({
      ordenId: orden.id,
      metodo,
      estado: "completado",
      fecha: new Date()
    });

    orden.estado = "pagado";
    await orden.save();

    res.json({ mensaje: "Pago procesado exitosamente" });
  } catch (err) {
    res.status(500).json({ mensaje: "Error al procesar pago", error: err.message });
  }
};

module.exports = { procesarPago };
