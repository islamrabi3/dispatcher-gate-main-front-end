<script setup lang="ts">
import { ref, computed } from 'vue'
const chosenImage = ref<Blob[] | MediaSource[] | null>(null)
const previewImage = computed(() =>
  chosenImage.value ? URL.createObjectURL(chosenImage.value[0]) : ''
)
defineProps<{
  clientType: 'carrier' | 'shipper'
}>()
defineEmits<{
  (e: 'nextStep', data: any): void
}>()
</script>
<template>
  <div>
    <pages-auth-auth-form
      :title="'register'"
      :paragraph="'please fill your Personal information'"
      :height="500"
    >
      <template #form>
        <inputs-form-wrapper :form-id="'step1-form'" @submit="$emit('nextStep', $event)">
          <v-row class="py-5">
            <!-- PREVIEW YOUR PROFILE -->
            <v-col cols="12" class="d-flex justify-center align-center">
              <v-avatar
                :image="previewImage"
                color="primary"
                icon="mdi-account-outline"
                :size="80"
              ></v-avatar>
            </v-col>
            <!-- SELECT YOUR IMAGE -->
            <v-col cols="12" class="py-1">
              <inputs-dynamic-input
                type="file"
                label="image"
                rules="required|image"
                json-key="image"
                accept="image/png, image/jpeg, image/bmp"
                inner-icon="mdi-camera"
                @get:model-value="chosenImage = $event"
              />
            </v-col>
            <!-- NAME  -->
            <v-col cols="12" class="py-1">
              <inputs-dynamic-input
                type="text"
                jsonKey="name"
                rules="required|min:3"
                label="name"
              />
            </v-col>
            <v-col cols="12">
              <v-btn variant="flat" color="primary" type="submit" block form="step1-form">
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
  </div>
</template>

<style scoped></style>
