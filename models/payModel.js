module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Pago", {
    ordenId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    metodo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
};
