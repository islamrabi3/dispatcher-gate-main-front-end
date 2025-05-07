import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()

export const getCarriers = async () => {
  return await axiosWrapper({ url: '/admins/carriers', method: 'get' }, false)
}
export const getCarrier = async (id: string) => {
  return await axiosWrapper({ url: `/admins/carriers/${id}`, method: 'get' }, false)
}
export const blockCarrier = async (id: string) => {
  return await axiosWrapper({ url: `/admins/carriers/${id}/block`, method: 'patch' })
}
export const unblockCarrier = async (id: string) => {
  return await axiosWrapper({ url: `/admins/carriers/${id}/unblock`, method: 'patch' })
}
export const verifyCarrier = async (id: string) => {
  return await axiosWrapper({ url: `/admins/carriers/${id}/verify`, method: 'patch' })
}
export const rejectCarrier = async (id: string) => {
  return await axiosWrapper({ url: `/admins/carriers/${id}/reject`, method: 'patch' })
}
