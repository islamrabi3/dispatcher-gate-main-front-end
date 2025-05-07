<script setup lang="ts">
import AdForm from '@/components/pages/ads/AdForm.vue'
import { ref } from 'vue'
import { setImageUrl } from '@/utils'
import { getAd, updateAd, getCarrierAd } from '@/services/ads'
import { useRoute } from 'vue-router/auto'
import type { AxiosResponse } from 'axios'
import { jsonToFormData } from '@/utils'
import { customDateFormat } from '@/utils'
const route = useRoute('/admin/advertisements/[id]')
const res = ref<AxiosResponse<any, any> | undefined>()
res.value = await getAd(route.params.id)

const dialog = ref(false)
const offerDialog = ref(false)
const submitting = ref(false)
const handleSubmit = async (data: any) => {
  submitting.value = true
  const submitRes = await updateAd(jsonToFormData(data), route.params.id)
  submitting.value = false
  if (submitRes?.status === 200) {
    dialog.value = false
    res.value = await getAd(route.params.id)
  }
}
const offerSubmitting = ref(false)
</script>
<template>
  <div class="pa-5">
    <div class="d-flex align-center justify-space-between">
      <h1 class="font-weight-bold text-capitalize">{{ res?.data.title }}</h1>
    </div>
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
    <common-common-dialog
      :title="'send offer'"
      :submitting="offerSubmitting"
      :dialog="offerDialog"
      :form-name="'offer-form'"
      :width="500"
      @toggleDialog="offerDialog = false"
    >
      <template #formd>
        <inputs-form-wrapper :form-id="'offer-form'">
          <v-row class="py-5">
            <v-col cols="12">
              <inputs-dynamic-input
                :type="'text'"
                :input-type="'number'"
                json-key="price"
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
    <v-card flat rounded="lg" class="my-5 pa-5">
      <v-card-title class="font-weight-bold bg-primary text-capitalize">
        shipment image
      </v-card-title>
      <v-img :src="setImageUrl(res!.data.image_url)" class="w-100" height="300"></v-img>
    </v-card>
    <v-card flat rounded="lg">
      <v-card-text class="font-weight-bold text-capitalize">
        <div class="ma-0 d-flex flex-wrap">
          <v-col
            v-for="(value, key) in Object.fromEntries(
              Object.entries(res!.data).filter(
                ([key]) =>
                  !key.includes('image_url') &&
                  !key.includes('id') &&
                  !key.includes('shipperId') &&
                  !key.includes('isOrderPlaced') &&
                  !key.includes('title')
              )
            )"
            :key="key"
            cols="6"
          >
            <p class="font-weight-light text-capitalize text-grey pb-1 text-subtitle">
              {{ key }}
            </p>
            <div class="d-flex gap-1 align-center gap-2">
              <p class="text-body-1 font-weight-bold">
                {{ value }}
              </p>
            </div>
            <v-divider class="my-2"></v-divider>
          </v-col>
        </div>
      </v-card-text>
    </v-card>
    <common-common-show-form></common-common-show-form>
  </div>
</template>

<style scoped></style>
