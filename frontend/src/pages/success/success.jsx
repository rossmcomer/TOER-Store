import React from 'react'
import PaymentSuccessAnimation from '../../components/paymentSuccessAnimation'
import './success.css'
import { useNavigate } from 'react-router-dom'

export const Success = () => {
  const navigate = useNavigate()
  return (
    <div className="paymentStatus">
      <PaymentSuccessAnimation />
      <div>Payment Successful!</div>
      <div className="buttonContainer">
        <button onClick={() => navigate('/')}> Continue Shopping </button>
      </div>
    </div>
  )
}
