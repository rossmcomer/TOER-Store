const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Product extends Model {}

Product.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id',
              },
            allowNull: false
        },
        supplierId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'suppliers',
              key: 'id',
            },
          },
        size: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        unitsInStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'products',
    }
)

module.exports = Product