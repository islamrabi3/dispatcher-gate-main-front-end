<script setup lang="ts">
import AdForm from '@/components/pages/ads/AdForm.vue'
import { ref } from 'vue'
import { setImageUrl } from '@/utils'
import { getAd, updateAd, getCarrierAd, getAdminAd } from '@/services/ads'
import { createCCarrierOffer } from '@/services/offers'

import { useRoute } from 'vue-router/auto'
import type { AxiosResponse } from 'axios'
import { jsonToFormData } from '@/utils'

const route = useRoute('/admin/advertisements/[id]')
const role = sessionStorage.getItem('role')
const res = ref<AxiosResponse<any, any> | undefined>()
const handleGetAd = async () => {
  if (role === 'shipper') {
    return getAd(route.params.id)
  } else if (role === 'carrier') {
    return getCarrierAd(route.params.id)
  } else {
    return getAdminAd(route.params.id)
  }
}
res.value = await handleGetAd()

const dialog = ref(false)
const offerDialog = ref(false)
const submitting = ref(false)
const handleSubmit = async (data: any) => {
  submitting.value = true
  const submitRes = await updateAd(jsonToFormData(data), route.params.id)
  submitting.value = false
  if (submitRes?.status === 200) {
    dialog.value = false
    res.value = await handleGetAd()
  }
}

const offerSubmitting = ref(false)
let breadCrumbs = route.fullPath.split('/')
breadCrumbs.shift()
breadCrumbs.pop()

const offerSubmit = async (data: { price: string; notes: string }) => {
  data.price = JSON.parse(data.price)
  offerSubmitting.value = true
  const submitRes = await createCCarrierOffer({ ...data, adId: JSON.parse(route.params.id) })
  offerSubmitting.value = false
  if (submitRes?.status === 201) {
    dialog.value = false
    res.value = await getCarrierAd(route.params.id)
    offerDialog.value = false
  }
}
</script>
<template>
  <div class="pa-5">
    <v-card flat class="mb-6 pa-4 rounded-lg bg-grey-lighten-4">
      <div class="d-flex align-center justify-space-between">
        <div>
          <h1 class="text-h4 font-weight-bold text-capitalize mb-2">{{ res?.data.title }}</h1>

          <v-breadcrumbs class="pa-0" :items="breadCrumbs">
            <template v-slot:divider>
              <v-icon icon="mdi-chevron-right"></v-icon>
            </template>
          </v-breadcrumbs>
        </div>

        <div class="d-flex gap-3">
          <!-- Temporarily commented out Edit Ad button
          <v-btn
            v-if="role === 'shipper'"
            prepend-icon="mdi-pencil"
            rounded="pill"
            color="secondary"
            variant="elevated"
            class="text-capitalize font-weight-medium"
            @click="dialog = true"
          >
            Edit Ad
          </v-btn>
          -->

          <v-btn
            v-if="role === 'carrier'"
            prepend-icon="mdi-offer"
            rounded="pill"
            color="secondary"
            variant="elevated"
            class="text-capitalize font-weight-medium"
            @click="offerDialog = true"
          >
            Send Offer
          </v-btn>
        </div>
      </div>
    </v-card>

    <common-common-dialog
      :title="'send offer'"
      :submitting="offerSubmitting"
      :dialog="offerDialog"
      :form-name="'offer-form'"
      :width="500"
      @toggleDialog="offerDialog = false"
    >
      <template #formd>
        <inputs-form-wrapper :form-id="'offer-form'" @submit="offerSubmit">
          <v-row class="py-5">
            <v-col cols="12">
              <inputs-dynamic-input
                :type="'text'"
                :input-type="'number'"
                json-key="price"
                :prefix="'$'"
                :label="'price'"
                :rules="'required'"
              />
            </v-col>
            <v-col cols="12">
              <inputs-dynamic-input
                :type="'textarea'"
                :label="'notes'"
                json-key="notes"
                :rules="'required'"
              />
            </v-col>
          </v-row>
        </inputs-form-wrapper>
      </template>
    </common-common-dialog>
    <common-common-dialog
      :title="'edit ad'"
      :submitting="submitting"
      :dialog="dialog"
      @toggleDialog="dialog = false"
    >
      <template #formd>
        <ad-form :values="res!.data" @submit="handleSubmit($event)" />
      </template>
    </common-common-dialog>
    <v-row class="mt-2">
      <v-col cols="7">
        <v-card rounded="lg" class="mb-5" elevation="2">
          <v-card-title class="font-weight-bold bg-primary text-capitalize py-4 px-6">
            <v-icon icon="mdi-map-marker-path" class="mr-2"></v-icon>
            Shipment Route
          </v-card-title>
          <div class="pa-6 h-100">
            <v-card elevation="0" class="h-100 d-flex flex-column justify-center align-center bg-grey-lighten-5 rounded-lg pa-6">
              <div class="text-center mb-5 pa-3 rounded-lg bg-white elevation-1 w-100">
                <v-icon icon="mdi-map-marker" color="primary" size="large" class="mb-2"></v-icon>
                <h3 class="text-h6 font-weight-bold mb-3">Pickup Address</h3>
                <p class="text-body-1">{{ res?.data.pickupAddress }}</p>
              </div>
              <v-divider class="my-4 w-75"></v-divider>
              <div class="text-center mt-3 pa-3 rounded-lg bg-white elevation-1 w-100">
                <v-icon icon="mdi-map-marker-check" color="success" size="large" class="mb-2"></v-icon>
                <h3 class="text-h6 font-weight-bold mb-3">Delivery Address</h3>
                <p class="text-body-1">{{ res?.data.deliveryAddress }}</p>
              </div>
            </v-card>
          </div>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card rounded="lg" class="mb-5" elevation="2">
          <v-card-title class="font-weight-bold bg-primary text-capitalize py-4 px-6">
            <v-icon icon="mdi-image" class="mr-2"></v-icon>
            Shipment Image
          </v-card-title>
          <div class="pa-6">
            <v-img 
              :src="setImageUrl(res!.data.image_url)" 
              class="w-100 rounded-lg" 
              height="300"
              cover
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
        </v-card>
        <v-card rounded="lg" elevation="2" class="mb-5">
          <v-card-title class="font-weight-bold bg-primary text-capitalize py-4 px-6">
            <v-icon icon="mdi-information-outline" class="mr-2"></v-icon>
            Shipment Listing Information
          </v-card-title>
          <v-card-text class="pa-0">
            <common-common-show-form
              :title="''"
              :data="
                Object.fromEntries(
                  Object.entries(res!.data).filter(
                    ([key]) =>
                      typeof key === 'string' &&
                      !key.includes('image_url') &&
                      !key.includes('id') &&
                      !key.includes('shipperId') &&
                      !key.includes('isOrderPlaced') &&
                      !key.includes('title') &&
                      !key.includes('shipper')
                  )
                )
              "
            >
            </common-common-show-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.v-card {
  transition: all 0.3s ease;
}

.v-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1) !important;
}

.bg-primary {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.v-card-title {
  letter-spacing: 0.5px;
}

.text-h4 {
  letter-spacing: 0.5px;
}

.route-address-container {
  position: relative;
}

.route-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--v-primary-base);
  z-index: 0;
}
</style>
