module.exports = (sequelize, DataTypes) => {
  return sequelize.define("CartProduct", {
    cartId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });
};
