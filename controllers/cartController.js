const { Cart, Product, CartProduct } = require("../models");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({
      where: { userId: req.userId },
      include: { model: Product, through: { attributes: ["amount"] } }
    });
    res.json(cart || { message: "Carrito vacío" });
  } catch (err) {
    res.status(500).json({ message: "Error al obtener carrito", error: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const { productId, amount } = req.body;
    let cart = await Cart.findOne({ where: { userId: req.userId } });
    if (!cart) cart = await Cart.create({ userId: req.userId });

    let item = await CartProduct.findOne({
      where: { cartId: cart.id, productId }
    });

    if (item) {
      item.amount += amount;
      await item.save();
    } else {
      await CartProduct.create({ cartId: cart.id, productId, amount });
    }

    res.json({ message: "Producto agregado al carrito" });
  } catch (err) {
    res.status(500).json({ message: "Error al agregar al carrito", error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ where: { userId: req.userId } });
    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    await CartProduct.destroy({ where: { cartId: cart.id, productId } });
    res.json({ message: "Producto eliminado del carrito" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar del carrito", error: err.message });
  }
};

module.exports = {getCart, addProduct, deleteProduct};
