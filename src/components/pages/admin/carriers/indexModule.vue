<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import {
  getCarriers,
  blockCarrier,
  unblockCarrier,
  verifyCarrier,
  rejectCarrier
} from '@/services/carriers'

import type { AxiosResponse } from 'axios'

const res = ref<AxiosResponse | undefined>(undefined)

res.value = await getCarriers()

const headers = [
  { title: 'Image', align: 'start', key: 'image_url' },
  { title: 'Name', align: 'start', key: 'name' },
  { title: 'Phone', align: 'start', key: 'phone' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Joined Since', align: 'start', key: 'createdAt' },
  { title: 'Blocked', align: 'start', key: 'isBlocked' },
  { title: 'verified', align: 'start', key: 'verificationStatus' },
  { align: 'start', key: 'actions' }
]
</script>

<template>
  <div class="pa-5">
    <!-- 👉 TITLE AND ADD FORM -->
    <h1 class="text-capitalize font-weight-bold pb-5">Carriers</h1>
    <!-- 👉 TABLE -->
    <div class="py-1" v-if="res?.data.length">
      <common-common-table :items="res!.data" :headers="headers">
        <template #customOperations="{ item }">
          <v-list-item v-if="!item.isBlocked" link>
            <v-list-item-title
              class="font-weight-medium cursor-pointer text-capitalize"
              @click="
                async () => {
                  await blockCarrier(item.id)
                  res = await getCarriers()
                }
              "
            >
              block
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-else link>
            <v-list-item-title
              class="font-weight-medium cursor-pointer"
              @click="
                async () => {
                  await unblockCarrier(item.id)
                  res = await getCarriers()
                }
              "
            >
              unblock
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="item.verificationStatus === 'pending'" link>
            <v-list-item-title
              class="font-weight-medium cursor-pointer text-capitalize"
              @click="
                async () => {
                  await verifyCarrier(item.id)
                  res = await getCarriers()
                }
              "
            >
              verify
            </v-list-item-title>
          </v-list-item>
          <v-list-item v-if="item.verificationStatus === 'pending'" link>
            <v-list-item-title
              class="font-weight-medium cursor-pointer"
              @click="
                async () => {
                  await rejectCarrier(item.id)
                  res = await getCarriers()
                }
              "
            >
              reject
            </v-list-item-title>
          </v-list-item>
        </template>
      </common-common-table>
    </div>
    <empty-states-ads-empty v-else :label="'there are no carriers currently on the platform'" />
  </div>
</template>
