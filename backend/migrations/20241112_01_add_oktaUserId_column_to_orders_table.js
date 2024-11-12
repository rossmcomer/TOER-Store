module.exports = {
    up: async ({ context: queryInterface, Sequelize }) => {
      await queryInterface.addColumn('orders', 'okta_user_id', {
        type: Sequelize.STRING,
        allowNull: true,
      })
    },
    down: async ({ context: queryInterface }) => {
      await queryInterface.removeColumn('orders', 'okta_user_id')
    },
}