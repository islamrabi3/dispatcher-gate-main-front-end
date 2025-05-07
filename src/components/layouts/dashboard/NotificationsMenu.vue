<script setup lang="ts">
import moment from 'moment'

import { ref } from 'vue'
import { useRoute } from 'vue-router/auto'
import type { AxiosResponse } from 'axios'
import {
  shippersGetNotifications,
  carriersGetNotifications,
  adminGetNotifications,
  shippersReadNotifications,
  adminReadNotifications,
  carriersReadNotifications
} from '@/services/notifications'
import { customDateFormat, setImageUrl } from '@/utils'
const route = useRoute()
const res = ref<AxiosResponse | undefined>(undefined)
const role = sessionStorage.getItem('role')
if (role === 'admin') {
  res.value = await adminGetNotifications()
} else if (role === 'carrier') {
  res.value = await carriersGetNotifications()
} else {
  res.value = await shippersGetNotifications()
}
const handleReadNotifications = async () => {
  if (role === 'admin') {
    await adminReadNotifications()
  } else if (role === 'carrier') {
    await carriersReadNotifications()
  } else {
    await shippersReadNotifications()
  }

  if (role === 'admin') {
    res.value = await adminGetNotifications()
  } else if (role === 'carrier') {
    res.value = await carriersGetNotifications()
  } else {
    res.value = await shippersGetNotifications()
  }
}

const navigateToOffers = () => {
  if (role === 'admin') {
    return '/admin/offers'
  } else if (role === 'carrier') {
    return '/carriers/offers'
  } else {
    return '/shippers/offers'
  }
}

const navigateToOrders = () => {
  if (role === 'admin') {
    return '/admin/orders'
  } else if (role === 'carrier') {
    return '/carriers/orders'
  } else {
    return '/shippers/orders'
  }
}

const navigateToProfile = () => {
  if (role === 'admin') {
    return '/admin/profile'
  } else if (role === 'carrier') {
    return '/carriers/profile'
  } else {
    return '/shippers/profile'
  }
}

const navigateToComplaint = (id: number) => {
  if (role === 'admin') {
    return `/admin/complaints/${id}`
  } else if (role === 'carrier') {
    return `/carriers/complaints/${id}`
  } else {
    return `/shippers/complaints/${id}`
  }
}

const checkAction = (item: any) => {
  if (item.title.includes('Offer')) {
    return navigateToOffers()
  } else if (item.title.includes('Order')) {
    return navigateToOrders()
  } else if (item.body.includes('verified')) {
    return navigateToProfile()
  } else if (item.title.includes('Complaint')) {
    return navigateToComplaint(item.resourceId)
  }
}
</script>
<template>
  <v-menu location="left">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="text-none" stacked>
        <v-badge :content="res?.data.unreadNotificationsCount" color="red">
          <v-icon icon="mdi-bell-outline" color="primary"></v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card class="rounded-lg" :min-width="200">
      <div class="d-flex justify-space-between align-center">
        <v-card-title class="font-weight-bold text-h5">Notifications</v-card-title>
        <v-btn size="small" color="secondary" variant="text" @click="handleReadNotifications"
          >mark all as read</v-btn
        >
      </div>
      <v-card
        :width="350"
        v-for="(item, index) in res?.data.notifications"
        :key="index"
        :value="index"
        class="my-3"
        flat
        link
        :to="checkAction(item)"
      >
        <div class="d-flex justify-space-between align-center px-5">
          <div class="d-flex ga-1">
            <v-avatar :image="setImageUrl(item.image_url)" size="65"></v-avatar>
            <div>
              <!-- <v-card-title class="text-subtitle-2 my-0 py-0">{{ item.title }}</v-card-title> -->
              <v-card-text class="pb-0">
                {{ item.body }}
              </v-card-text>
              <v-card-text class="text-primary font-weight-medium py-0 text-caption">
                {{ moment(item.createdAt).fromNow() }}
              </v-card-text>
            </div>
          </div>

          <v-badge color="primary" :dot="true" v-if="!item.isRead"></v-badge>
        </div>
      </v-card>
    </v-card>
  </v-menu>
</template>

<style scoped></style>
