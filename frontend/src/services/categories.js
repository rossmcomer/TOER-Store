import axios from '../util/apiClient'

const baseUrl = '/categories'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default { getAll }
