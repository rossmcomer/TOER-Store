import React from 'react'
import { OrderItem } from './order-item'

export const OrdersTable = ({orders}) => {
  const { id, orderDate, salesTax, totalAmount, order_details } = orders

  return (
    <>
    <table className="orderItemsTable">
        <thead>
        <tr className="headerRow">
            <th className="orderDate">Date</th>
            <th className="orderTotal">Total</th>
        </tr>
        </thead>
        <tbody>
        {orders.map((order) => (
            <OrderItem key={order.id} id={id} orderDate={orderDate} salesTax={salesTax} totalAmount={totalAmount} order_details={order_details} />
        ))}
        </tbody>
    </table>
    </>
  )
}
