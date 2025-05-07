<script setup lang="ts">
import { computed } from 'vue'
import AdForm from '@/components/pages/ads/AdForm.vue'
import { useRoute } from 'vue-router/auto'
import { ref } from 'vue'
import { getAds, addAd, deleteAd, getCarrierAds, getAdminAds, deleteAdminAd } from '@/services/ads'
import { jsonToFormData } from '@/utils'
import type { AxiosResponse } from 'axios'
const res = ref<AxiosResponse<any, any> | undefined>(undefined)

const route = useRoute()
const handleGetAds = async (filters?: any) => {
  if (route.path.includes('admin')) {
    return await getAdminAds()
  } else if (route.path.includes('carriers')) {
    return await getCarrierAds(filters)
  } else {
    return await getAds()
  }
}
res.value = await handleGetAds()
const submitting = ref(false)
const dialog = ref(false)
const handleSubmit = async (data: any) => {
  submitting.value = true
  const submitRes = await addAd(jsonToFormData(data))
  submitting.value = false
  if (submitRes?.status === 201) {
    dialog.value = false
    res.value = await handleGetAds()
  }
}
const handleDelete = async (ad: any) => {
  ad.deleting = true
  role === 'admin' ? await deleteAdminAd(ad.id) : await deleteAd(ad.id)
  ad.deleting = false
  res.value = await handleGetAds()
}

const headers = [
  {
    title: 'image',
    align: 'start',
    key: 'image_url'
  },
  {
    title: 'pickup address',
    align: 'start',
    key: 'pickupAddress'
  },
  {
    title: 'pickup date',
    align: 'start',
    key: 'pickupDate'
  },
  {
    title: 'delivery address',
    align: 'start',
    key: 'deliveryAddress'
  },
  {
    title: 'delivery date',
    align: 'start',
    key: 'deliveryDate'
  },
  {
    title: 'shipment name',
    align: 'start',
    key: 'shipmentName'
  },
  {
    title: 'shipment type',
    align: 'start',
    key: 'shipmentType'
  },

  route.path.includes('shippers') || route.path.includes('admin')
    ? {
        title: '',
        align: 'start',
        key: 'actions'
      }
    : {}
]

const role = sessionStorage.getItem('role')
const filtering = ref(false)
const minValue = ref(0)
const EmptyStateLabel = computed(() => {
  return role === 'shipper'
    ? 'ad your first for carriers to contact you'
    : 'there is no results matching your search criteria.adjust location or filters to find more shipments'
})
const ModuleTitle = computed(() => {
  return role === 'shipper' ? 'my ads' : role === 'admin' ? 'all shipments' : 'find shipments'
})
</script>
<template>
  <div class="pa-5">
    <!-- 👉CARRIER FILTERS -->
    <v-navigation-drawer v-if="role === 'carrier'">
      <v-card flat class="pa-5">
        <v-card-title class="text-capitalize font-weight-bold">filter shipments</v-card-title>
        <inputs-form-wrapper
          :form-id="'ad-filters'"
          @submit="
            async (data: any) => {
              filtering = true
              res = await handleGetAds(data)
              filtering = false
            }
          "
        >
          <v-row>
            <v-col cols="12">
              <inputs-dynamic-input
                type="text"
                input-type="number"
                jsonKey="minPrice"
                rules="numeric"
                label="minimum price"
                @get:modelValue="minValue = $event"
              />
            </v-col>
            <v-col cols="12">
              <inputs-dynamic-input
                type="text"
                jsonKey="maxPrice"
                :rules="`min_value:${minValue}|numeric`"
                label="maximum price"
              />
            </v-col>

            <v-col cols="12">
              <inputs-dynamic-input type="map" jsonKey="pickupAddress" label="pickup address" />
              >
            </v-col>
            <v-col cols="12">
              <inputs-dynamic-input type="map" jsonKey="deliveryAddress" label="delivery address" />
            </v-col>
            <v-col cols="12">
              <v-btn
                variant="flat"
                prepend-icon="mdi-magnify"
                color="primary"
                block
                :loading="filtering"
                type="submit"
                form="ad-filters"
              >
                find
              </v-btn>
            </v-col>
          </v-row>
        </inputs-form-wrapper>
      </v-card>
    </v-navigation-drawer>
    <!-- 👉 TITLE AND ADD FORM -->
    <common-index-page
      :dialog="dialog"
      :module-title="ModuleTitle"
      :add-title="'add an ad'"
      :form-name="'ad-form'"
      :show-add="route.path.includes('shippers') ? true : false"
      :submitting="submitting"
      @toggleDialog="dialog = $event"
    >
      <template #form>
        <ad-form @submit="handleSubmit($event)" />
      </template>
    </common-index-page>
    <!-- 👉 TABLE -->
    <div class="py-1" v-if="res?.data.length">
      <common-common-table
        :items="res!.data"
        :headers="headers"
        :operations="['delete']"
        @delete="handleDelete($event)"
      ></common-common-table>
    </div>
    <empty-states-ads-empty v-else :label="EmptyStateLabel" />
  </div>
</template>

<style scoped></style>
