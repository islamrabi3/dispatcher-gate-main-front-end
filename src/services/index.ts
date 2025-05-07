import axios, { type AxiosRequestConfig } from 'axios'
import { toast } from 'vue3-toastify'

const catchError = (err: unknown) => {
  let msg = ''
  if (axios.isAxiosError(err)) {
    msg = err.response!.data.message

    if (Array.isArray(msg)) {
      for (const error of msg) {
        toast.error(error)
      }
    } else if (msg) {
      toast.error(msg)
    } else {
      toast.error('unexpected error')
    }
    if (err.response?.status === 403) {
      sessionStorage.removeItem('token')
      location.reload()
    }
  }
}

export function useAxiosWrapper() {
  const axiosWrapper = async (config: AxiosRequestConfig, showSuccessToast: boolean = true) => {
    try {
      const response = await axios(config)
      if (showSuccessToast) toast.success(response.data.msg || 'success')
      return response
    } catch (err) {
      catchError(err)
    }
  }
  return { axiosWrapper }
}
