<script setup lang="ts">


import Truck from '@/assets/truck.png'
import Boxes from '@/assets/boxes.png'
import { ref, watch } from 'vue'
const clientType = ref<'carrier' | 'shipper' | undefined>()

const checkColorType = (type: string) => {
  return clientType.value === type ? 'primary' : 'black'
}

const showError = ref(false)

watch(clientType, () => {
  clientType.value ? (showError.value = false) : (showError.value = true)
})

defineEmits<{
  (e: 'submit', clientType: string): void
}>()
</script>
<template>
  <pages-auth-auth-form
    :title="'register'"
    :paragraph="'are you carrier or shipper?'"
    :height="550"
  >
    <template #form>
      <inputs-form-wrapper>
        <v-row class="py-5">
          <!-- CARRIER -->
          <v-col cols="12">
            <v-card
              variant="outlined"
              rounded="lg"
              size="x-large"
              :color="checkColorType('carrier')"
              class="d-flex align-center justify-space-between px-1 py-3 cursor-pointer"
              @click="clientType = 'carrier'"
            >
              <div style="width: 10em">
                <v-card-title class="text-capitalize py-0">Carrier</v-card-title>
                <v-card-subtitle class="text-capitalize text-wrap text-caption py-0">
                  I have empty space to fill in my truck
                </v-card-subtitle>
              </div>
              <v-img :src="Truck" height="60"></v-img>
            </v-card>
          </v-col>
          <!-- SHIPPER -->
          <v-col cols="12">
            <v-card
              variant="outlined"
              rounded="lg"
              size="x-large"
              :color="checkColorType('shipper')"
              class="d-flex align-center justify-space-between px-1 py-3 cursor-pointer"
              @click="clientType = 'shipper'"
            >
              <div style="width: 10em">
                <v-card-title class="text-capitalize py-0">Shipper</v-card-title>
                <v-card-subtitle class="text-capitalize text-wrap text-caption py-0">
                  I have stuff I need to move
                </v-card-subtitle>
              </div>
              <v-img :src="Boxes" height="60"></v-img>
            </v-card>
          </v-col>
          <div class="d-flex justify-center align-center w-100">
            <p v-if="showError" class="text-red text-caption text-center">
              client type is required
            </p>
          </div>

          <v-col cols="12">
            <v-btn
              variant="flat"
              color="primary"
              type="submit"
              block
              form="step1-form"
              class="rounded-lg"
              @click="clientType ? $emit('submit', clientType) : (showError = true)"
            >
              next
            </v-btn>
          </v-col>
        </v-row>
      </inputs-form-wrapper>
    </template>
    <template #cardImage>
    <pages-auth-register-card-image :clientType="clientType" />
    </template>
  </pages-auth-auth-form>
</template>

<style scoped></style>
