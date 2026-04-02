'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('professors', {
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
                validate: {
                    min: {
                        args: [3],
                        msg: "Name should have at least 3 characters"
                    },
                    max: {
                        args: [100],
                        msg: "Name should have up to 100 characters"
                    }
                }
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    msg: "Emails must be unique",
                    name: "unique_email"
                },
                validate: {
                    isEmail: { msg: "'Email' must be a valid email" }
                }
            },
            telephone: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    is: {
                        args: /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/,
                        msg: "'Telephone' must be a valid Brazilian phone number"
                    }
                }
            },
            coordinationId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    key: "id",
                    model: "coordinations"
                }
            },
            registration: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    name: "unique_registration",
                    msg: "Registrations must be unique"
                }
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('professors');
    }
};
