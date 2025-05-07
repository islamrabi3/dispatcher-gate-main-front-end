import type { GenericObject } from 'vee-validate'
import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()

export const getCountries = async () => {
  return await axiosWrapper(
    { url: 'https://countriesnow.space/api/v0.1/countries/iso', method: 'get' },
    false
  )
}
export const getStates = async (data: any) => {
  return await axiosWrapper(
    { url: 'https://countriesnow.space/api/v0.1/countries/states', method: 'post', data },
    false
  )
}
export const getCities = async (data: any) => {
  return await axiosWrapper(
    { url: 'https://countriesnow.space/api/v0.1/countries/cities', method: 'post', data },
    false
  )
}
