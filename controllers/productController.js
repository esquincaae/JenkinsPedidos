const { Product } = require("../models");

const listProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener productos", error: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener producto", error: err.message });
  }
};

module.exports = { listProducts, getProduct };
