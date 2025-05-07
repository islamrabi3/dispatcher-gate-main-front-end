<script setup lang="ts">
import { ref } from 'vue'
import {
  getShipperComplaint,
  shipperUpdateComplaint,
  getAdminComplaint,
  carrierUpdateComplaint,
  getCarrierComplaint,
  adminResolveComplaint
} from '@/services/complaints'
import { customDateFormat } from '@/utils'
import { useRoute } from 'vue-router/auto'
import type { AxiosResponse } from 'axios'
import { useCheckNavigation } from '@/composables/checkNavigation'

const route = useRoute('/admin/offers/[id]')
const { handleNavigation } = useCheckNavigation()
const res = ref<AxiosResponse | undefined>(undefined)
const handleGetComplaint = async (id: string) => {
  if (route.path.includes('admin')) {
    return await getAdminComplaint(id)
  } else if (route.path.includes('carriers')) {
    return await getCarrierComplaint(id)
  } else {
    return await getShipperComplaint(id)
  }
}
res.value = await handleGetComplaint(route.params.id)
const carrier = res.value?.data?.carrier?.name
res.value!.data.carrier = carrier
const dialog = ref(false)
const submitting = ref(false)
const resolving = ref(false)
</script>

<style scoped></style>
<template>
  <div class="pa-5">
    <div class="d-flex align-center justify-space-between pb-5">
      <div class="d-flex ga-2 align-center">
        <h1 class="text-capitalize font-weight-bold">complaint details</h1>
        <v-chip size="large" :color="res?.data.status === 'resolved' ? 'success' : 'primary'">
          {{ res!.data.status }}
        </v-chip>
      </div>

      <v-btn
        v-if="!route.path.includes('admin')"
        class="rounded-xl"
        flat
        color="secondary"
        prepend-icon="mdi-pencil"
        @click="dialog = true"
      >
        edit complaint
      </v-btn>
      <v-btn
        v-else-if="res?.data.status === 'pending'"
        class="rounded-xl"
        flat
        color="success"
        :loading="resolving"
        prepend-icon="mdi-check"
        @click="
          async () => {
            resolving = true
            await adminResolveComplaint(route.params.id)
            resolving = false
            res = await handleGetComplaint(route.params.id)
          }
        "
      >
        resolve complaint
      </v-btn>

      <common-common-dialog
        :title="'edit complaint'"
        :submitting="submitting"
        :dialog="dialog"
        :form-name="'complaint'"
        @toggleDialog="dialog = false"
      >
        <template #formd>
          <inputs-form-wrapper
            :form-id="'complaint'"
            @submit="
              async (data: any) => {
                submitting = true
                await shipperUpdateComplaint(route.params.id, data)
                submitting = false
                dialog = false
                res = await getShipperComplaint(route.params.id)
                res!.data.carrier = res!.data.carrier.name
              }
            "
          >
            <v-row>
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
      </common-common-dialog>
    </div>
    <v-row>
      <v-col cols="3">
        <v-card flat rounded="lg" min-height="300">
          <v-card-title class="font-weight-bold bg-primary">complaint information</v-card-title>
          <v-card-text class="text-capitalize">
            <v-list>
              <v-list-item :prepend-icon="'mdi-clock'">
                {{ customDateFormat(res?.data.createdAt) }}
              </v-list-item>
              <v-list-item :prepend-icon="'mdi-truck'">
                {{ res?.data.carrier }}
              </v-list-item>
            </v-list>

            <div>
              <v-icon></v-icon>
              <p></p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-card flat rounded="lg" class="w-100" min-height="550">
          <v-card-title class="font-weight-bold bg-primary">complaint message</v-card-title>
          <v-card-text class="font-weight-semibold text-h5 text-capitalize py-5">{{
            res?.data.body
          }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
