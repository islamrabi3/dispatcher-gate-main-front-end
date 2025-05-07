import type { GenericObject } from 'vee-validate'
import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()
//: { email: string; password: string }
export const loginAdmin = async (data: GenericObject) => {
  return await axiosWrapper({ data, url: '/auth/signin/admin', method: 'post' }, false)
}
export const loginCarrier = async (data: GenericObject) => {
  return await axiosWrapper({ data, url: '/auth/signin/carrier', method: 'post' }, false)
}
export const loginShipper = async (data: GenericObject) => {
  return await axiosWrapper({ data, url: '/auth/signin/shipper', method: 'post' }, false)
}
export const signupCourier = async (data: GenericObject) => {
  return await axiosWrapper({ data, url: '/auth/signup/carrier', method: 'post' }, false)
}

export const signup = async (data: GenericObject) => {
  return await axiosWrapper({ data, url: '/auth/signup/shipper', method: 'post' }, false)
}
