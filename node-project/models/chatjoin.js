"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatJoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "userId",
      });
      this.belongsTo(models.ChatRoom, {
        foreignKey: "roomId",
      });
    }
  }
  ChatJoin.init(
    {},
    {
      sequelize,
      modelName: "ChatJoin",
    }
  );
  return ChatJoin;
};
