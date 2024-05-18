import axios from '../util/apiClient'
const baseUrl = '/api/create-checkout-session'

export const checkout = async (body) => {
    const headers = {
        "Content-Type": "application/json"
      }
  const response = await axios.post(baseUrl, body, { headers })
  return response.json
}