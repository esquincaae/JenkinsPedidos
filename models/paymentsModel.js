module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Payments", {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
};
