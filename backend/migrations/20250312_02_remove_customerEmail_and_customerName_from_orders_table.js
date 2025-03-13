const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('orders', 'customer_name')
    await queryInterface.removeColumn('orders', 'customer_email')
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('orders', 'customer_name', {
      type: DataTypes.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('orders', 'customer_email', {
      type: DataTypes.STRING,
      allowNull: true,
    })
  },
}