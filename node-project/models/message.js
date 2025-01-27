'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User,{
        targetKey : "id",
        foreignKey : "userId"
      })
      this.belongsTo(models.ChatRoom,{
        targetKey : "id",
        foreignKey : "roomId"
      })
    }
  }
  Message.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};