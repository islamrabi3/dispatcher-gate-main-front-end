<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'
import { customDateFormat, setImageUrl } from '@/utils'
const profileStore = useProfileStore()
const role = sessionStorage.getItem('role')
await profileStore.getProfileData()
</script>
<template>
  <div class="pa-5">
    <v-row min-height="500" flat rounded="lg" class="pa-5">
      <v-col cols="4">
        <v-card class="d-flex flex-column align-center justify-center pa-5 rounded-lg" flat>
          <v-avatar
            size="140"
            color="primary"
            :image="setImageUrl(profileStore.profileData?.data.image_url)"
            icon="mdi-account"
          ></v-avatar>
          <v-card-title class="font-weight-bold text-capitalize pb-0">
            {{ profileStore.profileData?.data.name }}
          </v-card-title>
          <v-rating
            v-if="role === 'carrier'"
            disabled
            :length="5"
            :size="25"
            :model-value="profileStore.profileData?.data.rating"
            active-color="primary"
            class="mb-4"
          />
          <v-chip
            :color="'green'"
            :text="profileStore.profileData?.data.role"
            class="text-uppercase"
            label
          ></v-chip>
          <v-list class="w-100">
            <v-list-item prepend-icon="mdi-phone">{{
              profileStore.profileData?.data.phone
            }}</v-list-item>
            <v-list-item prepend-icon="mdi-map-marker"
              >{{ profileStore.profileData?.data.address }} ,
              {{ profileStore.profileData?.data.state }} , {{ profileStore.profileData?.data.city }}
            </v-list-item>
            <v-list-item prepend-icon="mdi-email"
              >{{ profileStore.profileData?.data.email }}
            </v-list-item>
            <v-list-item v-if="role === 'shipper'" prepend-icon="mdi-clock">
              joined since
              {{ customDateFormat(profileStore.profileData?.data.createdAt) }}
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card class="bg-transparent" flat>
          <v-card-title v-if="role === 'carrier'" class="font-weight-black text-capitalize text-h4">
            {{ profileStore.profileData?.data.name }}
          </v-card-title>

          <v-list v-if="role === 'carrier'" class="w-100 bg-transparent">
            <v-list-item prepend-icon="mdi-clock"
              >joined since
              {{ customDateFormat(profileStore.profileData?.data.createdAt) }}</v-list-item
            >
            <v-list-item prepend-icon="mdi-account-check">
              {{ profileStore.profileData?.data.verificationStatus }}
            </v-list-item>
          </v-list>
        </v-card>
        <common-common-show-form
          v-if="role === 'carrier'"
          :title="'More Details'"
          :data="
            Object.fromEntries(
              Object.entries(profileStore.profileData?.data).filter(
                ([key]) =>
                  typeof key === 'string' &&
                  !key.includes('image_url') &&
                  !key.includes('id') &&
                  !key.includes('isBlocked') &&
                  !key.includes('stripeAccountId') &&
                  !key.includes('address') &&
                  !key.includes('city') &&
                  !key.includes('state') &&
                  !key.includes('zip_code') &&
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
