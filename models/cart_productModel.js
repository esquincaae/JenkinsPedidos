module.exports = (sequelize, DataTypes) => {
  return sequelize.define("CarritoProducto", {
    carritoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });
};
