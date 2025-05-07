import router from '@/router'
export function useCheckNavigation() {
  const handleNavigation = (route: any, to: any) => {
    return route.path.includes('admin')
      ? router.push(`/admin${to}`)
      : route.path.includes('shipper')
        ? router.push(`/shippers${to}`)
        : router.push(`/carriers${to}`)
  }
  return { handleNavigation }
}
