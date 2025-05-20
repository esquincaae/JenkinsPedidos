module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Usuario", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    contraseña: { type: DataTypes.STRING, allowNull: false }
  });
};
