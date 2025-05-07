import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()

export const createCCarrierOffer = async (data: any) => {
  return await axiosWrapper({ data, url: '/carriers/offers', method: 'post' })
}

export const getCarrierOffers = async () => {
  return await axiosWrapper({ url: '/carriers/offers', method: 'get' }, false)
}
export const getCarrierOffer = async (id: string) => {
  return await axiosWrapper({ url: `/carriers/offers/${id}`, method: 'get' }, false)
}
export const updateCarrierOffer = async (id: string, data: any) => {
  return await axiosWrapper({ url: `/carriers/offers/${id}`, method: 'patch', data })
}

export const getShipperOffers = async () => {
  return await axiosWrapper({ url: '/shippers/offers', method: 'get' }, false)
}

export const getShipperOffer = async (id: string) => {
  return await axiosWrapper({ url: `/shippers/offers/${id}`, method: 'get' }, false)
}
export const shipperAcceptOffer = async (id: string) => {
  return await axiosWrapper({ url: `/shippers/offers/${id}/accept`, method: 'post' })
}
export const shipperRejectOffer = async (id: string) => {
  return await axiosWrapper({ url: `/shippers/offers/${id}/reject`, method: 'patch' })
}
export const shipperCheckoutOffer = async (id: string) => {
  return await axiosWrapper({ url: `/shippers/offers/${id}/checkout`, method: 'post' })
}

export const getAdminOffers = async () => {
  return await axiosWrapper({ url: '/admins/offers', method: 'get' }, false)
}

export const deleteAdminOffer = async (id: string) => {
  return await axiosWrapper({ url: `/admins/offers/${id}`, method: 'delete' })
}
export const deleteCarrierOffer = async (id: string) => {
  return await axiosWrapper({ url: `/carriers/offers/${id}`, method: 'delete' })
}
export const getAdminOffer = async (id: string) => {
  return await axiosWrapper({ url: `/admins/offers/${id}`, method: 'get' }, false)
}
