module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Order", {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "pendiente" },
    date: { type: DataTypes.DATE, allowNull: false }
  });
};
