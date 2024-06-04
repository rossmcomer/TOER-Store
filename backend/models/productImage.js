const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class ProductImage extends Model {}

ProductImage.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'products',
              key: 'product_id',
            },
            allowNull: false
          },
        imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        }
    },
    {
        sequelize,
        underscored: true,
        timestamps: false,
        modelName: 'product_images',
    }
)

module.exports = ProductImage