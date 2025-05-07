import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()

export const getAds = async () => {
  return await axiosWrapper({ url: '/shippers/ads', method: 'get' }, false)
}
export const getCarrierAds = async (params?: any) => {
  return await axiosWrapper({ url: '/carriers/ads', method: 'get', params }, false)
}
export const getAdminAds = async () => {
  return await axiosWrapper({ url: '/admins/ads', method: 'get' }, false)
}

export const getAd = async (id: string) => {
  return await axiosWrapper({ url: `/shippers/ads/${id}`, method: 'get' }, false)
}

export const getCarrierAd = async (id: string) => {
  return await axiosWrapper({ url: `/carriers/ads/${id}`, method: 'get' }, false)
}

export const getAdminAd = async (id: string) => {
  return await axiosWrapper({ url: `/admins/ads/${id}`, method: 'get' }, false)
}

export const getShipmentTypes = async () => {
  return await axiosWrapper({ url: '/shippers/ads/shipment-types', method: 'get' }, false)
}

export const addAd = async (data: any) => {
  return await axiosWrapper({ url: '/shippers/ads', method: 'post', data })
}

export const deleteAd = async (id: number) => {
  return await axiosWrapper({ url: `/shippers/ads/${id}`, method: 'delete' })
}
export const deleteAdminAd = async (id: number) => {
  return await axiosWrapper({ url: `/admins/ads/${id}`, method: 'delete' })
}
export const deleteCarrierAd = async (id: number) => {
  return await axiosWrapper({ url: `/carriers/ads/${id}`, method: 'delete' })
}
export const updateAd = async (data: any, id: string) => {
  return await axiosWrapper({ url: `/shippers/ads/${id}`, method: 'patch', data })
}
