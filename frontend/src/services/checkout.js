import axios from '../util/apiClient'
const baseUrl = '/create-checkout-session'

const checkout = async (body) => {
    const headers = {
        "Content-Type": "application/json"
      }
  const response = await axios.post(baseUrl, body, { headers })
  return response.data
}

// eslint-disable-next-line
export default { checkout }