module.exports = (sequelize, DataTypes) => {
  return sequelize.define("OrdenProducto", {
    ordenId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precioUnitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
};
