import React from 'react'
import { OrderItem } from './order-item'

export const OrdersTable = ({ orders }) => {
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
            <OrderItem
              key={order.id}
              id={order.id}
              orderDate={order.orderDate}
              salesTax={order.salesTax}
              totalAmount={order.totalAmount}
              order_details={order.order_details}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}
