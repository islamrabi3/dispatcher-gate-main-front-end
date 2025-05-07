import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()

export const getAdminComplaints = async () => {
  return await axiosWrapper({ url: '/admins/complaints', method: 'get' }, false)
}
export const getCarrierComplaints = async () => {
  return await axiosWrapper({ url: `/carriers/complaints`, method: 'get' }, false)
}
export const getShipperComplaints = async () => {
  return await axiosWrapper({ url: `/shippers/complaints`, method: 'get' }, false)
}

export const getAdminComplaint = async (id: string) => {
  return await axiosWrapper({ url: `/admins/complaints/${id}`, method: 'get' }, false)
}
export const getCarrierComplaint = async (id: string) => {
  return await axiosWrapper({ url: `carriers/complaints/${id}`, method: 'get' }, false)
}
export const getShipperComplaint = async (id: string) => {
  return await axiosWrapper({ url: `shippers/complaints/${id}`, method: 'get' }, false)
}

export const shipperCreateComplaint = async (data: any) => {
  return await axiosWrapper({ url: `shippers/complaints`, method: 'post', data })
}
export const carrierCreateComplaint = async (data: any) => {
  return await axiosWrapper({ url: `carriers/complaints`, method: 'post', data })
}

export const shipperUpdateComplaint = async (id: string, data: any) => {
  return await axiosWrapper({ url: `shippers/complaints/${id}`, method: 'patch' , data })
}
export const carrierUpdateComplaint = async (id: string, data: any) => {
  return await axiosWrapper({ url: `shippers/complaints/${id}`, method: 'patch', data })
}

export const carrierDeleteComplaint = async (id: string) => {
  return await axiosWrapper({ url: `/carriers/complaints/${id}`, method: 'delete' })
}
export const shipperDeleteComplaint = async (id: string) => {
  return await axiosWrapper({ url: `/shippers/complaints/${id}`, method: 'delete' })
}
export const adminDeleteComplaint = async (id: string) => {
  return await axiosWrapper({ url: `/admins/complaints/${id}`, method: 'delete' })
}
export const adminResolveComplaint = async (id: string) => {
  return await axiosWrapper({ url: `/admins/complaints/${id}/resolve`, method: 'patch' })
}
