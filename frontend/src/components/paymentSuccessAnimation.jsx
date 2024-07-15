import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../assets/GreenCheckmark.json'

const PaymentSuccessAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    intermission: 5000,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return <Lottie options={defaultOptions} height={400} width={400} />
}

export default PaymentSuccessAnimation
