const { Paymemts, Order } = require("../models");

const processPayments = async (req, res) => {
  try {
    const { orderId, method } = req.body;

    const order = await Order.findByPk(orderId);
    if (!order || order.userId !== req.userId) {
      return res.status(404).json({ message: "Orden no válida" });
    }

    if (order.status === "pagado") {
      return res.status(400).json({ message: "Esta orden ya fue pagada" });
    }

    await Payments.create({
      orderId: order.id,
      method,
      status: "completado",
      date: new Date()
    });

    order.status = "pagado";
    await order.save();

    res.json({ message: "Pago procesado exitosamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al procesar pago", error: err.message });
  }
};

module.exports = { processPayemnts };
