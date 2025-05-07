<script setup lang="ts">
import AdForm from '@/components/pages/ads/AdForm.vue'
import { ref } from 'vue'
import { getAds, addAd, deleteAd } from '@/services/ads'
import { useProfileStore } from '@/stores/profile'
import { jsonToFormData } from '@/utils'
import type { AxiosResponse } from 'axios'
const profileStore = useProfileStore()
const res = ref<AxiosResponse<any, any> | undefined>(undefined)
res.value = await getAds()
const submitting = ref(false)
const dialog = ref(false)
const handleSubmit = async (data: any) => {
  submitting.value = true
  const submitRes = await addAd(jsonToFormData(data))
  submitting.value = false
  if (submitRes?.status === 201) {
    dialog.value = false
    res.value = await getAds()
  }
}
const handleDelete = async (ad: any) => {
  ad.deleting = true
  await deleteAd(ad.id)
  ad.deleting = false
  res.value = await getAds()
}
</script>
<template>
  <div class="pa-5">
    <common-index-page
      :dialog="dialog"
      :show-add="profileStore.profileData?.data.role === 'shipper' ? true : false"
      :module-title="profileStore.profileData?.data.role === 'shipper' ? 'My Ads' : 'Shipper Ads'"
      :add-title="'add an ad'"
      :submitting="submitting"
      @toggleDialog="dialog = $event"
    >
      <template #form>
        <ad-form @submit="handleSubmit($event)" />
      </template>
    </common-index-page>
    <v-row>
      <pages-ads-ad-card
        v-for="(ad, index) in res!.data"
        :key="index"
        :ad="ad"
        @delete="handleDelete(ad)"
      />
    </v-row>
  </div>
</template>

<style scoped></style>
