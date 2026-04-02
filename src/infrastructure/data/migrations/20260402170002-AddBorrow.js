'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.createTable("borrowings", {
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
            equipmentId: {
                type: Sequelize.INTEGER,
                references: {
                    key: "id",
                    model: "equipments",
                },
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            },
            studentId: {
                type: Sequelize.INTEGER,
                references: {
                    key: "id",
                    model: "students"
                },
                allowNull: true,
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            },
            professorId: {
                type: Sequelize.INTEGER,
                references: {
                    key: "id",
                    model: "professors"
                },
                allowNull: true,
                onDelete: "RESTRICT",
                onUpdate: "CASCADE",
            },
            borrowDate: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Date.now()
            },
            isStillBorrowed: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
            returnDate: {
                type: Sequelize.DATE,
                allowNull: true
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("borrowings")
    }
};
