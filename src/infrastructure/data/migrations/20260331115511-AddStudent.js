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
                    },
                },
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
            registration: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: {
                    name: "unique_registration",
                    msg: "Registrations must be unique"
                }
            },
            birthdate: {
                type: Sequelize.DATE,
                allowNull: false,
                validate: {
                    isDate: {
                        args: true,
                        msg: "Birthdate must be a valid date"
                    },
                    isBefore: {
                        args: new Date().toISOString().split("T")[0],
                        msg: "Birthdate must be in the past"
                    }
                }
            },
            term: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    min: {
                        args: [1],
                        msg: "Term should be at least 1"
                    }
                }
            },
            shift: {
                type: Sequelize.ENUM(["MORNING", "AFTERNOON", "NIGHT"]),
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('professors');
    }
};

