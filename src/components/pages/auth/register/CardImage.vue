<template>
  <div
    :style="{
      backgroundImage: `url(${clientType === 'carrier' ? CarrierBg : bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
    class="pa-5 h-100"
  >
    <h2 class="text-capitalize text-center mt-5 text-white">dispatcher gate</h2>
    <p class="text-center text-grey-lighten-1">Connecting shippers and carriers</p>
  </div>
</template>

<script setup lang="ts">
import bg from '@/assets/shipper-bg.jpg'
import CarrierBg from '@/assets/bg.jpg'
defineProps<{
  clientType: 'carrier' | 'shipper'
}>()
</script>

<style scoped></style>
