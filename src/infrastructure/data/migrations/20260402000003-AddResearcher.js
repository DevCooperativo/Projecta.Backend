'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('researchers', {
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
            functionName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            weeklyHours: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            projectId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'projects',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            },
            studentId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'students',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            professorId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'professors',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('researchers');
    },
};
