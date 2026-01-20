import axios from '../util/apiClient'
const baseUrl = '/orders'

const getAll = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  }

  const response = await axios.get(baseUrl, { headers })

  return response.data
}

export default getAll
