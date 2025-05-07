import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type AxiosResponse } from 'axios'
import { getCarrierProfile, getAdminProfile, getShipperProfile } from '@/services/profile'
import { useRoute } from 'vue-router'
export const useProfileStore = defineStore('profile', {
  state: () => ({
    profileData: undefined as AxiosResponse<any, any> | undefined
  }),
  actions: {
    async getProfileData() {
      const role = sessionStorage.getItem('role')
      if (role === 'admin') {
        this.profileData = await getAdminProfile()
      } else if (role === 'carrier') {
        this.profileData = await getCarrierProfile()
      } else if (role === 'shipper') {
        this.profileData = await getShipperProfile()
      }
    }
  }
})
