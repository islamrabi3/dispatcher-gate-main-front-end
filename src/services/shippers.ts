import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()

export const getShippers = async () => {
  return await axiosWrapper({ url: '/admins/shippers', method: 'get' }, false)
}
export const getShipper = async (id: string) => {
  return await axiosWrapper({ url: `/admins/shippers/${id}`, method: 'get' }, false)
}
export const blockShipper = async (id: string) => {
  return await axiosWrapper({ url: `/admins/shippers/${id}/block`, method: 'patch' })
}
export const unblockShipper = async (id: string) => {
  return await axiosWrapper({ url: `/admins/shippers/${id}/unblock`, method: 'patch' })
}
