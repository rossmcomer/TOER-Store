module.exports = {
  up: async ({ context: queryInterface, Sequelize }) => {
    await queryInterface.addColumn('orders', 'sales_tax', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    })

    await queryInterface.addColumn('order_details', 'sales_tax', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
      defaultValue: 0.00
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('orders', 'sales_tax');

    await queryInterface.removeColumn('order_details', 'sales_tax');
  },
}