const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class OrderDetail extends Model {}

OrderDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'order_id',
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'product_id',
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    unit_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'order_details',
  },
)

module.exports = OrderDetail
