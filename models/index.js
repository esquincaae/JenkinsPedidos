const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URL);

const Usuario = require("./usuario.model")(sequelize, DataTypes);
const Producto = require("./producto.model")(sequelize, DataTypes);
const Carrito = require("./carrito.model")(sequelize, DataTypes);
const CarritoProducto = require("./carrito_producto.model")(sequelize, DataTypes);
const Orden = require("./orden.model")(sequelize, DataTypes);
const OrdenProducto = require("./orden_producto.model")(sequelize, DataTypes);
const Pago = require("./pago.model")(sequelize, DataTypes);

// Relaciones
Usuario.hasOne(Carrito, { foreignKey: "usuarioId" });
Carrito.belongsTo(Usuario, { foreignKey: "usuarioId" });

Carrito.belongsToMany(Producto, {
  through: CarritoProducto,
  foreignKey: "carritoId"
});
Producto.belongsToMany(Carrito, {
  through: CarritoProducto,
  foreignKey: "productoId"
});

Usuario.hasMany(Orden, { foreignKey: "usuarioId" });
Orden.belongsTo(Usuario, { foreignKey: "usuarioId" });

Orden.belongsToMany(Producto, {
  through: OrdenProducto,
  foreignKey: "ordenId"
});
Producto.belongsToMany(Orden, {
  through: OrdenProducto,
  foreignKey: "productoId"
});

Orden.hasOne(Pago, { foreignKey: "ordenId" });
Pago.belongsTo(Orden, { foreignKey: "ordenId" });

module.exports = {
  sequelize,
  Usuario,
  Producto,
  Carrito,
  CarritoProducto,
  Orden,
  OrdenProducto,
  Pago
};
