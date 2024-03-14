import axios from 'axios'

const axiosClient: any = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  headers: {
    'Content-type': 'application/json',
    'x-api-key': 'T8acmvg1yaCQ6',
  },
})

export default axiosClient
