<script setup lang="ts">
import { ref, computed } from 'vue'
import { type AxiosResponse } from 'axios'
import { useRouter } from 'vue-router/auto'
import {
  getShipperOffers,
  getCarrierOffers,
  getAdminOffers,
  deleteCarrierOffer,
  deleteAdminOffer,
  shipperAcceptOffer,
  shipperRejectOffer
} from '@/services/offers'
import { useRoute } from 'vue-router/auto'

const role = sessionStorage.getItem('role')
const router = useRouter()
const res = ref<AxiosResponse | undefined>(undefined)
const route = useRoute('/admin/offers/[id]')
const handleGetOffers = async () => {
  if (route.path.includes('admin')) {
    return await getAdminOffers()
  } else if (route.path.includes('carriers')) {
    return await getCarrierOffers()
  } else {
    return await getShipperOffers()
  }
}
res.value = await handleGetOffers()

const handleDelete = async (offer: any) => {
  if (role === 'admin') {
    await deleteAdminOffer(offer.id)
  } else if (role === 'carrier') {
    await deleteCarrierOffer(offer.id)
  }
  res.value = await handleGetOffers()
}

const Label = computed(() => {
  return role === 'shipper' ? 'offers' : role === 'carrier' ? 'my offers' : 'all offers'
})
const EmptyLabel = computed(() => {
  return role === 'shipper'
    ? 'there are no offers,add an ad to start receiving offers'
    : role === 'carrier'
      ? 'browse shipments to start sending offers'
      : 'there ar no offers currently on the platform'
})
const Operations = computed(() => {
  return role === 'shipper' ? ['reject', 'accept'] : ['delete']
})
</script>
<template>
  <div class="pa-5">
    <h1 class="text-capitalize font-weight-bold pb-5">{{ Label }}</h1>
    <v-row>
      <common-common-table
        v-if="res?.data.length"
        :headers="[
          {
            title: 'ad title',
            align: 'start',
            key: 'ad.title'
          },
          {
            title: 'shipment title',
            align: 'start',
            key: 'ad.shipmentName'
          },
          {
            title: 'shipment type',
            align: 'start',
            key: 'ad.shipmentType'
          },
          {
            title: 'carrier name',
            align: 'start',
            key: 'carrier.name'
          },
          {
            title: 'carrier phone',
            align: 'start',
            key: 'carrier.phone'
          },
          {
            title: 'price($)',
            align: 'start',
            key: 'price'
          },
          {
            title: 'notes',
            align: 'start',
            key: 'notes'
          },
          {
            title: 'status',
            align: 'start',
            key: 'status'
          },

          {
            title: '',
            align: 'start',
            key: 'actions'
          }
        ]"
        :show-page="false"
        :operations="Operations"
        :items="res!.data"
        @delete="handleDelete($event)"
        @accept="
          async (item: any) => {
            await shipperAcceptOffer(item.id)
            res = await getShipperOffers()
          }
        "
        @reject="
          async (item: any) => {
            await shipperRejectOffer(item.id)
            res = await getShipperOffers()
          }
        "
      ></common-common-table>
      <div v-else class="w-100">
        <empty-states-ads-empty title="no offers" :label="EmptyLabel">
          <template #action>
            <v-btn
              v-if="role === 'shipper'"
              variant="outlined"
              color="primary"
              size="large"
              class="mt-5"
              @click="router.push('/shippers/advertisements')"
            >
              add an ad
            </v-btn>
            <v-btn
              v-if="role === 'carrier'"
              variant="outlined"
              color="primary"
              size="large"
              class="mt-5"
              @click="router.push('/carriers/advertisements')"
            >
              browse shipments
            </v-btn>
          </template>
        </empty-states-ads-empty>
      </div>
    </v-row>
  </div>
</template>

<route lang="yaml">
meta:
  layout: 'dashboardLayout'
</route>
