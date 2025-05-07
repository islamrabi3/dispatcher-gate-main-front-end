<script setup lang="ts">
import { getCarrier } from '@/services/carriers'
import { useRoute } from 'vue-router/auto'
import { customDateFormat, setImageUrl } from '@/utils'

const route = useRoute('/admin/shippers/[id]')
const res = await getCarrier(route.params.id)
</script>
<template>
  <div class="pa-5">
    <v-row min-height="500" flat rounded="lg" class="pa-5">
      <v-col cols="4">
        <v-card class="d-flex flex-column align-center justify-center pa-5 rounded-lg" flat>
          <v-avatar
            size="140"
            color="primary"
            :image="setImageUrl(res?.data.image_url)"
            icon="mdi-account"
          ></v-avatar>
          <v-card-title class="font-weight-bold text-capitalize pb-0">
            {{ res?.data.name }}
          </v-card-title>
          <v-rating
            disabled
            :length="5"
            :size="25"
            :model-value="res?.data.rating"
            active-color="primary"
            class="mb-4"
          />
          <v-chip
            v-if="res?.data.isBlocked"
            :color="'error'"
            :text="'blocked'"
            class="text-uppercase"
            label
          ></v-chip>
          <v-list class="w-100">
            <v-list-item prepend-icon="mdi-phone">{{ res?.data.phone }}</v-list-item>
            <v-list-item prepend-icon="mdi-map-marker"
              >{{ res?.data.address }} , {{ res?.data.state }} ,
              {{ res?.data.city }}
            </v-list-item>
            <v-list-item prepend-icon="mdi-email">{{ res?.data.email }} </v-list-item>
            <v-list-item prepend-icon="mdi-clock">
              joined since
              {{ customDateFormat(res?.data.createdAt) }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card class="bg-transparent" flat>
          <v-card-title class="font-weight-black text-capitalize text-h4">
            {{ res?.data.name }}
          </v-card-title>

          <v-list class="w-100 bg-transparent">
            <v-list-item prepend-icon="mdi-clock"
              >joined since {{ customDateFormat(res?.data.createdAt) }}</v-list-item
            >
            <v-list-item prepend-icon="mdi-account-check">
              {{ res?.data.verificationStatus }}
            </v-list-item>
          </v-list>
        </v-card>
        <common-common-show-form
          :title="'More Details'"
          :data="
            Object.fromEntries(
              Object.entries(res?.data).filter(
                ([key]) =>
                  !key.includes('image_url') &&
                  !key.includes('id') &&
                  !key.includes('isBlocked') &&
                  !key.includes('stripeAccountId') &&
                  !key.includes('address') &&
                  !key.includes('city') &&
                  !key.includes('state') &&
                  !key.includes('name') &&
                  !key.includes('phone') &&
                  !key.includes('email') &&
                  !key.includes('updatedAt') &&
                  !key.includes('createdAt') &&
                  !key.includes('rating') &&
                  !key.includes('role') &&
                  !key.includes('verificationStatus') &&
                  !key.includes('balance')
              )
            )
          "
        ></common-common-show-form>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
