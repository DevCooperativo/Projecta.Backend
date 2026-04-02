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
            itemId: {
                type: Sequelize.INTEGER,
                references: {
                    key: "id",
                    model: "equipments"
                }
            },
            studentId: {
                type: Sequelize.INTEGER,
                references: {
                    key: "id",
                    model: "students"
                },
                allowNull: true
            },
            professorId: {
                type: Sequelize.INTEGER,
                references: {
                    key: "id",
                    model: "professors"
                },
                allowNull: true
            },
            researcherId: {
                type: Sequelize.INTEGER,
                references: {
                    key: "id",
                    model: "researchers"
                },
                allowNull: true
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
                allowNull: false
            },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("borrowings")
    }
};
