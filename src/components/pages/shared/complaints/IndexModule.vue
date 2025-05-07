<script setup lang="ts">
import AdForm from '@/components/pages/ads/AdForm.vue'

import { ref } from 'vue'
import {
  getShipperComplaints,
  shipperCreateComplaint,
  shipperDeleteComplaint,
  getCarrierComplaints,
  carrierCreateComplaint,
  carrierDeleteComplaint,
  getAdminComplaints,
  adminDeleteComplaint
} from '@/services/complaints'
import { getAdminOrders, getCarrierOrders, getShipperOrders } from '@/services/orders'
import type { AxiosResponse } from 'axios'

const orders = ref<AxiosResponse<any> | undefined>()
const role = sessionStorage.getItem('role')

const handleGetOrders = async () => {
  if (role === 'admin') {
    return await getAdminOrders()
  } else if (role === 'carrier') {
    return await getCarrierOrders()
  } else {
    return await getShipperOrders()
  }
}

orders.value = await handleGetOrders()

const handleGetComplaints = async () => {
  if (role === 'admin') {
    return await getAdminComplaints()
  } else if (role === 'carrier') {
    console.log('carrier')
    return await getCarrierComplaints()
  } else {
    return await getShipperComplaints()
  }
}
const handleCreateComplaint = async (data: any) => {
  if (role === 'carrier') {
    return await carrierCreateComplaint(data)
  } else if (role === 'shipper') {
    return await shipperCreateComplaint(data)
  }
}
const handleDeleteComplaint = async (id: string) => {
  if (role === 'admin') {
    return await adminDeleteComplaint(id)
  }
  if (role === 'carrier') {
    return await carrierDeleteComplaint(id)
  } else if (role === 'shipper') {
    return await shipperDeleteComplaint(id)
  }
}
const res = ref<AxiosResponse<any, any> | undefined>(undefined)
res.value = await handleGetComplaints()
const submitting = ref(false)
const dialog = ref(false)
const handleSubmit = async (data: any) => {
  submitting.value = true
  data.orderId = JSON.parse(data.orderId)
  const submitRes = await handleCreateComplaint(data)
  submitting.value = false
  if (submitRes?.status === 201) {
    dialog.value = false
    res.value = await handleGetComplaints()
  }
}
const handleDelete = async (ad: any) => {
  ad.deleting = true
  await handleDeleteComplaint(ad.id)
  ad.deleting = false
  res.value = await handleGetComplaints()
}

const headers = [
  role === 'admin'
    ? {
        title: 'complaint source',
        align: 'start',
        key: 'complainantType'
      }
    : {},
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
    title: 'shipper name',
    align: 'start',
    key: 'shipper.name'
  },
  {
    title: 'shipper phone',
    align: 'start',
    key: 'shipper.phone'
  },
  {
    title: 'created at',
    align: 'start',
    key: 'createdAt'
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
]
</script>
<template>
  <div class="pa-5">
    <common-index-page
      :dialog="dialog"
      :module-title="role === 'admin' ? 'all complaints' : 'my complaints'"
      :add-title="'add an complaint'"
      :show-add="!(role === 'admin') ? true : false"
      :form-name="'complaint-form'"
      :submitting="submitting"
      @toggleDialog="dialog = $event"
    >
      <template #form>
        <inputs-form-wrapper :form-id="'complaint-form'" @submit="handleSubmit($event)">
          <v-row>
            <v-col cols="12">
              <inputs-dynamic-input
                type="select"
                jsonKey="orderId"
                rules="required"
                label="choose order"
                :items="orders?.data"
                item-title="title"
                item-value="id"
              />
            </v-col>
            <v-col cols="12" sm="12">
              <inputs-dynamic-input
                type="textarea"
                jsonKey="body"
                label="complaint"
                rules="required"
              />
            </v-col>
          </v-row>
        </inputs-form-wrapper>
      </template>
    </common-index-page>
    <div v-if="res?.data.length" class="py-1">
      <common-common-table
        :items="res?.data"
        :no-data-text="'add your first complaint'"
        :headers="res?.data.length ? headers : []"
        :operations="['delete']"
        @delete="handleDelete($event)"
      ></common-common-table>
    </div>
    <div v-else>
      <empty-states-ads-empty
        :icon="'mdi-list-box'"
        :title="'there are no complaints'"
        :label="
          role === 'admin'
            ? 'there are no complaints currently on the platform'
            : 'you have no complaints currently on the platform'
        "
      >
        <template>
          <v-btn v-if="role !== 'admin'" variant="outlined" color="primary"
            >add your first complaint</v-btn
          >
        </template>
      </empty-states-ads-empty>
    </div>
  </div>
</template>

<style scoped></style>
