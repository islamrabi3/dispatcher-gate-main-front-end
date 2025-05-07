<script setup lang="ts">
import { getShipmentTypes } from '@/services/ads'
import type { AxiosResponse } from 'axios'
import { createFile, setImageUrl } from '@/utils'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { customDateFormat } from '@/utils'

const loading = ref(false)
const types = ref<AxiosResponse<string[], any> | undefined>()
let image = ref<File | undefined>(undefined)

onMounted(async () => {
  loading.value = true
  types.value = await getShipmentTypes()
  loading.value = false
  image.value = await createFile(setImageUrl(props.values?.image_url))
})

defineEmits<{
  (e: 'submit', data: any): void
}>()

const props = defineProps<{
  values?: any
}>()
const setPlace = ($event: any) => {
  console.log($event)
}
</script>

<template>
  <div>
    <inputs-form-wrapper :form-id="'ad-form'" @submit="$emit('submit', $event)">
      <v-row>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            type="file"
            jsonKey="image"
            accept="image/png, image/jpeg, image/bmp"
            inner-icon="mdi-camera"
            rules="required|image"
            label="image"
            :value="image"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.title"
            type="text"
            jsonKey="title"
            rules="required"
            label="title"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.shipmentName"
            type="text"
            jsonKey="shipmentName"
            rules="required"
            label="shipment name"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.shipmentType"
            type="select"
            jsonKey="shipmentType"
            rules="required"
            label="shipment type"
            :items="types?.data"
            :loading="loading"
            item-title="name"
            item-value="name"
          />
        </v-col>
        <v-col cols="12">
          <inputs-dynamic-input
            :value="values?.description"
            type="textarea"
            jsonKey="description"
            rules="required"
            label="description"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.paymentMethod"
            type="select"
            jsonKey="paymentMethod"
            rules="required"
            label="payment method"
            :items="['cash']"
            item-title="name"
            item-value="name"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.price"
            type="text"
            jsonKey="price"
            rules="required"
            prefix="$"
            label="price"
            input-type="number"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.quantity"
            type="text"
            jsonKey="quantity"
            rules="required|numeric"
            label="quantity"
            input-type="number"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.width"
            type="text"
            jsonKey="width"
            rules="required|numeric"
            label="width"
            suffix="cm"
            input-type="number"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.height"
            type="text"
            jsonKey="height"
            rules="required|numeric"
            suffix="cm"
            label="height"
            input-type="number"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.length"
            type="text"
            jsonKey="length"
            suffix="cm"
            rules="required|numeric"
            label="length"
            input-type="number"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.pickupAddress"
            type="map"
            jsonKey="pickupAddress"
            rules="required"
            label="pickup address"
          />
          >
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="values?.deliveryAddress"
            type="map"
            jsonKey="deliveryAddress"
            rules="required"
            label="delivery address"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="
              customDateFormat(
                values?.deliveryDate,
                {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric'
                },
                'fr-CA'
              )
            "
            type="text"
            jsonKey="pickupDate"
            rules="required"
            label="pickup date"
            input-type="date"
          />
        </v-col>
        <v-col cols="12" sm="6">
          <inputs-dynamic-input
            :value="
              customDateFormat(
                values?.deliveryDate,
                {
                  month: 'numeric',
                  day: 'numeric',
                  year: 'numeric'
                },
                'fr-CA'
              )
            "
            type="text"
            jsonKey="deliveryDate"
            rules="required"
            label="delivery date"
            input-type="date"
          />
        </v-col>
      </v-row>
    </inputs-form-wrapper>
  </div>
</template>

<style scoped></style>
