<script setup lang="ts">
import { ref } from 'vue'
import { getShipperOffer, shipperAcceptOffer, shipperRejectOffer } from '@/services/offers'
import { useRoute } from 'vue-router/auto'
import type { AxiosResponse } from 'axios'
import { useCheckNavigation } from '@/composables/checkNavigation'
const route = useRoute('/admin/offers/[id]')
const { handleNavigation } = useCheckNavigation()
const res = ref<AxiosResponse | undefined>(undefined)
res.value = await getShipperOffer(route.params.id)
const rejecting = ref(false)
const accepting = ref(false)
</script>

<style scoped></style>
<template>
  <div class="pa-5">
    <div class="pb-5 d-flex justify-space-between align-center">
      <h1>{{ res?.data.carrier.name }} on {{ res?.data.ad.title }}</h1>
      <div class="d-flex gap-2" v-if="res!.data.status === 'pending'">
        <v-btn
          flat
          prepend-icon="mdi-check"
          rounded="xl"
          color="green"
          :loading="accepting"
          @click="
            async () => {
              accepting = true
              await shipperAcceptOffer(route.params.id)
              accepting = false
              res = await getShipperOffer(route.params.id)
            }
          "
        >
          accept offer
        </v-btn>
        <v-btn
          flat
          prepend-icon="mdi-cancel"
          rounded="xl"
          color="red"
          :loading="rejecting"
          @click="
            async () => {
              rejecting = true
              await shipperRejectOffer(route.params.id)
              rejecting = false
              res = await getShipperOffer(route.params.id)
            }
          "
        >
          reject offer
        </v-btn>
      </div>
    </div>
    <common-common-show-form
      :data="
        Object.fromEntries(
          Object.entries(res!.data).filter(
            ([key]) =>
              typeof key === 'string' &&
              !key.includes('id') &&
              !key.includes('shipperId') &&
              !key.includes('isOrderPlaced') &&
              !key.includes('title') &&
              !key.includes('shipper') &&
              !key.includes('ad') &&
              !key.includes('carrier')
              )
        )
      "
    >
      <template #customCol>
        <v-col cols="6" class="py-0">
          <p class="font-weight-light text-capitalize text-grey pb-1 text-subtitle">offer ad</p>
          <div class="d-flex gap-1 align-center gap-2">
            <v-btn
              exact
              color="primary"
              flat
              rounded="xl"
              @click="handleNavigation(route, `/advertisements/${res!.data.adId}`)"
            >
              view
            </v-btn>
          </div>
          <v-divider class="my-2"></v-divider>
        </v-col>
      </template>
    </common-common-show-form>
  </div>
</template>
