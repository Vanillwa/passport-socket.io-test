'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'ChatJoins', 
      'userId', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // Users 모델에서
          key: 'id', // 그 아이디 값을 참고합니다.
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    await queryInterface.addColumn(
      'ChatJoins', 
      'roomId', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ChatRooms', // Users 모델에서
          key: 'id', // 그 아이디 값을 참고합니다.
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    await queryInterface.addColumn(
      'Messages', 
      'userId', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // Users 모델에서
          key: 'id', // 그 아이디 값을 참고합니다.
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    await queryInterface.addColumn(
      'Messages',
      'roomId', 
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'ChatRooms', // Users 모델에서
          key: 'id', // 그 아이디 값을 참고합니다.
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
