module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Orden", {
    usuarioId: { type: DataTypes.INTEGER, allowNull: false },
    total: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    estado: { type: DataTypes.STRING, defaultValue: "pendiente" },
    fecha: { type: DataTypes.DATE, allowNull: false }
  });
};
