<script setup lang="ts">
import Courier from '@/assets/courier.png'
</script>
<template>
  <div class="card-background w-100 h-100 d-flex justify-center align-end">
    <v-card rounded="xl" class="mt-5 bg-transparent w-90" flat>
      <v-card-title class="font-weight-bold text-white pa-1 text-capitalize text-wrap">
        Take Control of Your Delivery the way you want 🚀
      </v-card-title>
      <div class="d-flex align-end justify-end">
        <img :src="Courier" height="320" class="mx-5" />
      </div>
    </v-card>
  </div>
</template>

<style scoped>
.card-background {
  background: #f37335; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    hwb(26 28% 5%),
    hwb(20 21% 5%)
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, hwb(26 28% 5%), hwb(20 18% 5%)); /* W3C */
}
</style>
