import axios from '../util/apiClient'

const baseUrl = '/products'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getOne = async (encodedName) => {
  const request = await axios.get(`${baseUrl}/${encodedName}`)
  return request.data
}

export default { getAll, getOne }
