const Category = require('./category')
const Product = require('./product')
const Supplier = require('./supplier')
const ProductImage = require('./productImage')
const Order = require('./order')
const OrderDetail = require('./orderDetail')

Product.belongsTo(Category, { foreignKey: 'category_id' });
Product.belongsTo(Supplier, { foreignKey: 'supplier_id' });

ProductImage.belongsTo(Product, { foreignKey: 'product_id' });

OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });
OrderDetail.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
    Category, Product, Supplier, ProductImage, Order, OrderDetail
}