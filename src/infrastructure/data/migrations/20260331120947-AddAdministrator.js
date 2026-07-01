'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
        await queryInterface.createTable('administrators', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            isVisible: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    name: "unique_email",
                    msg: "Emails must be unique"
                },
                validate: {
                    isEmail: {
                        args: true,
                        msg: "Email must be valid"
                    }
                }
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('administrators');
    }
};
