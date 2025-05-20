const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const User = require("./userModel")(sequelize, DataTypes);
const Product = require("./productModel")(sequelize, DataTypes);
const Cart = require("./cartModel")(sequelize, DataTypes);
const CartProduct = require("./cart_productModel")(sequelize, DataTypes);
const Order = require("./orderModel")(sequelize, DataTypes);
const OrderProduct = require("./order_productModel")(sequelize, DataTypes);
const Payments = require("./paymentsModel")(sequelize, DataTypes);

// Relaciones (igual que antes)
User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.belongsToMany(Product, {
  through: CartProduct,
  foreignKey: "cartId"
});
Product.belongsToMany(Cart, {
  through: CartProduct,
  foreignKey: "productId"
});

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "orderId"
});
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId"
});

Order.hasOne(Payments, { foreignKey: "orderId" });
Payments.belongsTo(Order, { foreignKey: "orderId" });

module.exports = {
  sequelize,
  User,
  Product,
  Cart,
  CartProduct,
  Order,
  OrderProduct,
  Payments,
};
