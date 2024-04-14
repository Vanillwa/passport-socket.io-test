"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        as : "join",
        through : "ChatJoin",
        sourceKey: "id",
        foreignKey: "roomId",
      });
      this.hasMany(models.Message,{
        sourceKey: "id",
        foreignKey: "roomId",
      })
    }
  }
  ChatRoom.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ChatRoom",
    }
  );
  return ChatRoom;
};
