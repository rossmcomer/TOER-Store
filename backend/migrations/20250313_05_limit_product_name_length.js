const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('products', 'name', {
      type: DataTypes.STRING(22),
      allowNull: false,
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('products', 'name', {
      type: DataTypes.STRING,
      allowNull: false,
    })
  },
}