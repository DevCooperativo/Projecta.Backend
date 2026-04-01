'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('projectCategories', {
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
            commerciallyRelevant: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            area: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('projectCategories');
    },
};