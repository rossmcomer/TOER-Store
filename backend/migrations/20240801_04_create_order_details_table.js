const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
      await queryInterface.createTable('order_details', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
        orderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'orders',
                key: 'id',
            },
        },
        productId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'products',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        salesTax: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: 0.0,
        },
      })
  
    },
  
    down: async ({ context: queryInterface }) => {
      await queryInterface.dropTable('order_details')
    }
  }