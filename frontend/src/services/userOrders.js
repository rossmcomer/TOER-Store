import axios from '../util/apiClient'
const baseUrl = '/orders'

const getAll = async (token) => {
    const headers = {
        Authorization: `Bearer ${token}`,
    }

    const request = await axios.get(baseUrl, { headers })

    return request.data
}

export default { getAll }
