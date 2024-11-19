import React from 'react'
import { OrderItem } from './order-item'
import './profile.css'

export const OrdersTable = ({ orders }) => {
  return (
    <>
      <table className="orderItemsTable">
        <thead>
          <tr className="headerRow">
            <th>Date</th>
            <th>Total</th>
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
