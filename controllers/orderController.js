const { Order, Cart, CartProduct, OrderProduct, Product} = require("../models");

const createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.userId },
      include: { model: Product }
    });

    if (!carrit || cart.Products.length === 0) {   
      return res.status(400).json({ message: "El carrito está vacío" });
    }

    let total = 0;
    const productsOrder = await Promise.all(cart.Products.map(async product => {
      const amount = product.CartProduct.amount;
      const subtotal = product.price * amount;
      total += subtotal;

      return {
        productId: product.id,
        amount,
        unitPrice: product.price
      };
    }));

    const order = await Order.create({
      userId: req.userId,
      total,
      status: "pendiente",
      date: new Date()
    });

    for (const item of productsOrder) {
      await OrderProduct.create({ ...item, orderId: order.id });
    }

    // Vaciar carrito
    await CartProduct.destroy({ where: { cartId: cart.id } });

    res.status(201).json({ message: "Orden creada con éxito", ordenId: orden.id });
  } catch (err) {
    res.status(500).json({ message: "Error al crear orden", error: err.message });
  }
};

module.exports = { createOrder };
