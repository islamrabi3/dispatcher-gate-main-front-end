<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { getShippers, blockShipper, unblockShipper } from '@/services/shippers'
import type { AxiosResponse } from 'axios'

const res = ref<AxiosResponse | undefined>(undefined)

res.value = await getShippers()

const headers = [
  { title: 'Image', align: 'start', key: 'image_url' },
  { title: 'Name', align: 'start', key: 'name' },
  { title: 'Phone', align: 'start', key: 'phone' },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'State', align: 'start', key: 'State' },
  { title: 'City', align: 'start', key: 'city' },
  { title: 'Address', align: 'start', key: 'address' },
  { title: 'Zip Code', align: 'start', key: 'zip_code' },
  { title: 'Joined Since', align: 'start', key: 'createdAt' },
  { title: 'Blocked', align: 'start', key: 'isBlocked' },
  { align: 'start', key: 'actions' }
]
</script>

<template>
  <div class="pa-5">
    <!-- 👉 TITLE AND ADD FORM -->
    <h1 class="text-capitalize font-weight-bold pb-5">Shippers</h1>
    <!-- 👉 TABLE -->
    <div class="py-1" v-if="res?.data.length">
      <common-common-table :show-page="false" :items="res!.data" :headers="headers">
        <template #customOperations="{ item }">
          <v-list-item v-if="!item.isBlocked" link>
            <v-list-item-title
              class="font-weight-medium cursor-pointer text-capitalize"
              @click="
                async () => {
                  await blockShipper(item.id)
                  res = await getShippers()
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
                  await unblockShipper(item.id)
                  res = await getShippers()
                }
              "
            >
              unblock
            </v-list-item-title>
          </v-list-item>
        </template>
      </common-common-table>
    </div>
    <empty-states-ads-empty v-else :label="'there are no shippers currently on the platform'" />
  </div>
</template>
