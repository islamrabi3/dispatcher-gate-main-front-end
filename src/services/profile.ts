import type { GenericObject } from 'vee-validate'
import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()

export const getShipperProfile = async () => {
  return await axiosWrapper({ url: '/shippers/profile', method: 'get' }, false)
}

export const getCarrierProfile = async () => {
  return await axiosWrapper({ url: '/carriers/profile', method: 'get' }, false)
} 

export const getAdminProfile = async () => {
  return await axiosWrapper({ url: '/admins/profile', method: 'get' }, false)
}

export const updateShipperProfile = async (data: any) => {
  return await axiosWrapper({ data, url: '/shippers/profile', method: 'post' })
}

export const updateCarrierProfile = async (data: any) => {
  return await axiosWrapper({ data, url: '/carriers/profile', method: 'post' })
}
