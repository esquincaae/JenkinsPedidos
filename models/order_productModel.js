module.exports = (sequelize, DataTypes) => {
  return sequelize.define("OrderProduct", {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amont: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unitPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  });
};
