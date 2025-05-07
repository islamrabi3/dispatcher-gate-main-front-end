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
    <div class="d-flex align-center justify-space-between">
      <div>
        <h1 class="font-weight-bold text-capitalize">{{ res?.data.title }}</h1>

        <v-breadcrumbs class="pa-0" :items="breadCrumbs">
          <template v-slot:divider>
            <v-icon icon="mdi-chevron-right"></v-icon>
          </template>
        </v-breadcrumbs>
      </div>

      <v-btn
        v-if="role === 'shipper'"
        flat
        prepend-icon="mdi-pencil"
        rounded="xl"
        color="secondary"
        @click="dialog = true"
      >
        edit ad
      </v-btn>

      <v-btn
        v-if="role === 'carrier'"
        flat
        prepend-icon="mdi-offer"
        rounded="xl"
        color="secondary"
        @click="offerDialog = true"
      >
        send offer
      </v-btn>
    </div>

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
    <v-row>
      <v-col cols="7">
        <v-card flat rounded="lg" class="my-5" style="height: 98%">
          <v-card-title class="font-weight-bold bg-primary text-capitalize">
            shipment route
          </v-card-title>
          <div class="pa-5 h-100">
            <GMapMap
              :center="{ lat: 51.093048, lng: 6.84212 }"
              :zoom="7"
              class="h-100"
              style="height: 100%"
            />
          </div>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card flat rounded="lg" class="my-5">
          <v-card-title class="font-weight-bold bg-primary text-capitalize">
            shipment image
          </v-card-title>
          <div class="pa-5">
            <v-img :src="setImageUrl(res!.data.image_url)" class="w-100" height="300"></v-img>
          </div>
        </v-card>
        <common-common-show-form
          :title="'Shipment Listing Information'"
          :data="
            Object.fromEntries(
              Object.entries(res!.data).filter(
                ([key]) =>
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
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
