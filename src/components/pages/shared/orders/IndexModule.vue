<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router/auto'
import {
  getShipperOrders,
  shipperReleaseMoney,
  shipperCancelOrder,
  getCarrierOrders,
  getAdminOrders,
  adminReleaseMoney,
  adminUpdateOrder,
  carrierUpdateOrder
} from '@/services/orders'
import type { AxiosResponse } from 'axios'
import { computed } from 'vue'

const router = useRouter()
const role = sessionStorage.getItem('role')
const res = ref<AxiosResponse | undefined>(undefined)

const handleGetOrders = async () => {
  if (role === 'admin') {
    return await getAdminOrders()
  } else if (role === 'carrier') {
    return await getCarrierOrders()
  } else {
    return await getShipperOrders()
  }
}

res.value = await handleGetOrders()

const tab = ref<'pending' | 'pickedUp' | 'completed' | 'cancelled'>('pending')
const tabs: Array<'pending' | 'pickedUp' | 'completed' | 'cancelled'> = [
  'pending',
  'pickedUp',
  'completed',
  'cancelled'
]
const order = ref({
  releasing: false,
  updatingOrderStatus: false,
  releaseMoneyDialog: false,
  updateOrderDialog: false,
  status: '',
  id: ''
})
const moduleOperations = computed(() => {
  const operations = []
  if (role === 'shipper' && tab.value === 'pending') {
    operations.push('cancel')
  }
  if ((role === 'shipper' || role === 'admin') && tab.value === 'completed') {
    operations.push('releasemoney')
  }
  if (role === 'carrier' || role === 'admin') {
    operations.push('updateorder')
  }
  return operations
})
const handleReleaseMoney = async (id: string, data: any) => {
  if (role === 'shipper') {
    return await shipperReleaseMoney(id, data)
  } else if (role === 'admin') {
    return await adminReleaseMoney(id, data)
  }
}

const handleUpdateOrder = async (id: string, data: any) => {
  if (role === 'carrier') {
    return await carrierUpdateOrder(id, data)
  } else if (role === 'admin') {
    return await adminUpdateOrder(id, data)
  }
}

const Title = computed(() => {
  return role === 'shipper' ? 'orders' : role === 'carrier' ? 'my orders' : 'all orders'
})

const EmptyLabel = computed(() => {
  return role === 'shipper'
    ? 'there are no orders,add an ad to start receiving offers'
    : role === 'carrier'
      ? 'browse shipments to start sending offers'
      : 'there ar no offers currently on the platform'
})
</script>

<template>
  <div class="pa-10">
    <h1 class="text-capitalize font-weight-bold">{{ Title }}</h1>

    <v-sheet v-if="res!.data.length" class="bg-transparent mx-0 px-0 my-3" max-width="600">
      <v-slide-group show-arrows>
        <v-slide-group-item v-for="(value, index) in tabs" :key="index">
          <v-btn
            class="ma-2"
            variant="flat"
            rounded
            :color="tab === value ? 'primary' : undefined"
            @click="tab = value"
          >
            {{ value }}
          </v-btn>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>

    <common-common-table
      v-if="res!.data.length"
      :headers="[
        {
          title: 'image',
          align: 'start',
          key: 'image_url'
        },
        {
          title: 'pickup address',
          align: 'start',
          key: 'pickupAddress'
        },
        {
          title: 'pickup date',
          align: 'start',
          key: 'pickupDate'
        },
        {
          title: 'delivery address',
          align: 'start',
          key: 'deliveryAddress'
        },
        {
          title: 'delivery date',
          align: 'start',
          key: 'deliveryDate'
        },
        {
          title: 'shipment name',
          align: 'start',
          key: 'shipmentName'
        },
        {
          title: 'shipment type',
          align: 'start',
          key: 'shipmentType'
        },
        {
          title: 'status',
          align: 'start',
          key: 'status'
        },
        moduleOperations.length ? { key: 'actions' } : {}
      ]"
      :show-page="false"
      :items="res!.data.filter((item: any) => item.status === tab)"
      :operations="moduleOperations"
      @releasemoney="
        ($event: any) => {
          $event.releaseMoneyDialog = true
          order = $event
        }
      "
      @cancel="
        async ($event: any) => {
          $event.cancelling = true
          await shipperCancelOrder($event.id)
          $event.cancelling = false
          res = await getShipperOrders()
        }
      "
      @updateorder="
        (data: any) => {
          data.updateOrderDialog = true
          order = data
        }
      "
    ></common-common-table>
    <div v-else class="w-100">
      <empty-states-ads-empty title="no orders" :label="EmptyLabel">
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

    <common-common-dialog
      :title="'release money'"
      :submitting="order.releasing"
      :dialog="order.releaseMoneyDialog"
      :form-name="'offer-form'"
      :width="500"
      @toggleDialog="order.releaseMoneyDialog = false"
    >
      <template #formd>
        <inputs-form-wrapper
          :form-id="'offer-form'"
          @submit="
            async (data: any) => {
              order.releasing = true
              await handleReleaseMoney(order.id, data)
              order.releasing = false
              order.releaseMoneyDialog = false
              res = await handleGetOrders()
            }
          "
        >
          <v-row class="py-5">
            <v-col cols="12">
              <inputs-dynamic-input
                :value="res!.data.status"
                type="rating"
                jsonKey="rating"
                rules="required"
                label="rating"
              />
              <inputs-dynamic-input
                :value="res!.data.status"
                type="textarea"
                jsonKey="review"
                rules="required"
                label="review"
              />
            </v-col>
          </v-row>
        </inputs-form-wrapper>
      </template>
    </common-common-dialog>
    <common-common-dialog
      :title="'update order status'"
      :submitting="order.updatingOrderStatus"
      :dialog="order.updateOrderDialog"
      :form-name="'status-form'"
      :width="500"
      @toggleDialog="order.updateOrderDialog = false"
    >
      <template #formd>
        <inputs-form-wrapper
          :form-id="'status-form'"
          @submit="
            async (data: any) => {
              order.updatingOrderStatus = true
              await handleUpdateOrder(order.id, data)
              order.updatingOrderStatus = false
              order.updateOrderDialog = false
              res = await handleGetOrders()
            }
          "
        >
          <v-row class="py-5">
            <v-col cols="12">
              <inputs-dynamic-input
                :value="order.status"
                type="select"
                jsonKey="status"
                rules="required"
                label="shipment type"
                :items="['pending', 'pickedUp', 'completed', 'cancelled']"
              />
            </v-col>
          </v-row>
        </inputs-form-wrapper>
      </template>
    </common-common-dialog>
  </div>
</template>
