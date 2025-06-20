<script setup lang="ts">
import { ref } from 'vue'
import { getShipperOrder } from '@/services/orders'
import { useRoute } from 'vue-router/auto'
const route = useRoute('/admin/offers/[id]')
const res = await getShipperOrder(route.params.id)
</script>

<style scoped></style>
<template>
  <div class="pa-5">
    <div class="d-flex align-start text-capitalize py-5 justify-space-between">
      <h1>{{ res!.data.title }}</h1>
    </div>

    <common-common-show-form
      :data="
        Object.fromEntries(
          Object.entries(res!.data).filter(
            ([key]) =>
              typeof key === 'string' &&
              !key.includes('id') &&
              !key.includes('image_url') &&
              !key.includes('carrierId') &&
              !key.includes('offerId') &&
              !key.includes('shipperId') &&
              !key.includes('adId')
          )
        )
      "
    >
    </common-common-show-form>
  </div>
</template>
