module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Carrito", {
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};
