"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.ChatRoom, {
        as : "join",
        through : "ChatJoin",
        sourceKey: "id",
        foreignKey: "userId",
      });
      this.hasMany(models.Message,{
        sourceKey: "id",
        foreignKey: "userId",
      })
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
