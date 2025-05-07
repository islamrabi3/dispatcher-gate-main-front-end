import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()

export const getAdminOrders = async () => {
  return await axiosWrapper({ url: '/admins/orders', method: 'get' }, false)
}
export const getCarrierOrders = async () => {
  return await axiosWrapper({ url: `/carriers/orders`, method: 'get' }, false)
}
export const getShipperOrders = async () => {
  return await axiosWrapper({ url: `/shippers/orders`, method: 'get' }, false)
}
export const getAdminOrder = async (id: string) => {
  return await axiosWrapper({ url: `/admins/orders/${id}`, method: 'get' }, false)
}
export const getCarrierOrder = async (id: string) => {
  return await axiosWrapper({ url: `carriers/orders/${id}`, method: 'get' }, false)
}
export const getShipperOrder = async (id: string) => {
  return await axiosWrapper({ url: `shippers/orders/${id}`, method: 'get' }, false)
}
export const adminReleaseMoney = async (id: string, data: any) => {
  return await axiosWrapper({ url: `/admins/orders/${id}/release-money`, method: 'patch', data })
}
export const shipperReleaseMoney = async (id: string, data: any) => {
  return await axiosWrapper({ url: `/shippers/orders/${id}/release-money`, method: 'patch', data })
}

export const shipperRateOrder = async (id: string) => {
  return await axiosWrapper({ url: `/shippers/orders/${id}/rate`, method: 'patch' })
}

export const shipperCancelOrder = async (id: string) => {
  return await axiosWrapper({ url: `/shippers/orders/${id}/cancel`, method: 'patch' })
}

export const adminUpdateOrder = async (id: string, data: any) => {
  return await axiosWrapper({ url: `/admins/orders/${id}`, method: 'patch', data })
}

export const carrierUpdateOrder = async (id: string, data: any) => {
  return await axiosWrapper({ url: `/carriers/orders/${id}`, method: 'patch', data })
}
