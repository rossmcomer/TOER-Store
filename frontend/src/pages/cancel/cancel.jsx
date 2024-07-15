import React from 'react'
import PaymentCanceledAnimation from '../../components/paymentCanceledAnimation'
import './cancel.css'
import { useNavigate } from 'react-router-dom'

export const Cancel = () => {
  const navigate = useNavigate()
  return (
    <div className="paymentStatus">
      <PaymentCanceledAnimation />
      <div>Payment Canceled!</div>
      <div className="buttonContainer">
        <button onClick={() => navigate('/')}> Continue Shopping </button>
      </div>
    </div>
  )
}
