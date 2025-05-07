// Axios
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL
const token = sessionStorage.getItem('token')
if (token) axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
