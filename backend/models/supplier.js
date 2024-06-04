const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Supplier extends Model {}

Supplier.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'suppliers',
    }
)

module.exports = Supplier