import { useAxiosWrapper } from '.'
const { axiosWrapper } = useAxiosWrapper()

export const carriersGetNotifications = async () => {
  return await axiosWrapper({ url: '/carriers/notifications', method: 'get' }, false)
}
export const shippersGetNotifications = async () => {
  return await axiosWrapper({ url: `/shippers/notifications`, method: 'get' }, false)
}

export const adminGetNotifications = async () => {
  return await axiosWrapper({ url: `/admins/notifications`, method: 'get' }, false)
}

export const carriersReadNotifications = async () => {
  return await axiosWrapper({ url: '/carriers/notifications', method: 'patch' }, false)
}
export const shippersReadNotifications = async () => {
  return await axiosWrapper({ url: `/shippers/notifications`, method: 'patch' }, false)
}

export const adminReadNotifications = async () => {
  return await axiosWrapper({ url: `/admins/notifications`, method: 'patch' }, false)
}
