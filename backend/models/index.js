const Category = require('./category')
const Product = require('./product')
const Supplier = require('./supplier')
const ProductImage = require('./productImage')
const Order = require('./order')
const OrderDetail = require('./orderDetail')

Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.belongsTo(Supplier, { foreignKey: 'supplierId' });

Product.hasMany(ProductImage, { foreignKey: 'productId', as: 'images' })
ProductImage.belongsTo(Product, { foreignKey: 'productId' });

OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
    Category, Product, Supplier, ProductImage, Order, OrderDetail
}