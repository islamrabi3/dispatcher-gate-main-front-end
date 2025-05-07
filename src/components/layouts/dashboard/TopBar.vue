<script setup lang="ts">
import logo from '@/assets/Mylogo.png'
import { useRoute } from 'vue-router/auto'
import { ref } from 'vue'
import { useCheckNavigation } from '@/composables/checkNavigation'

const { handleNavigation } = useCheckNavigation()

const route = useRoute()

const role = sessionStorage.getItem('role')

defineEmits<{
  (e: 'toggleDrawer'): void
}>()
interface ListItem {
  icon: string
  title: string
  to: string
}
const items: ListItem[] = [
  // {
  //   icon: 'mdi-widgets-outline',
  //   title: 'home',
  //   to: `/`
  // },
  {
    icon: role === 'shipper' ? 'mdi-truck-outline' : 'mdi-compass-outline',
    title: role === 'shipper' ? 'my ads' : role === 'admin' ? 'all shipments' : 'find shipments',
    to: `/advertisements`
  },
  {
    icon: 'mdi-handshake-outline',
    title: role === 'shipper' ? 'offers' : role === 'admin' ? 'all offers' : 'my offers',
    to: `/offers`
  },
  {
    icon: 'mdi-archive-outline',
    title: role === 'shipper' ? 'orders' : role === 'admin' ? 'all orders' : 'my orders',
    to: `/orders`
  },
  {
    icon: 'mdi-list-box-outline',
    title:
      role === 'shipper' ? ' my complaints' : role === 'admin' ? 'all complaints' : 'my complaints',
    to: `/complaints`
  }
]

if (route.path.includes('admin')) {
  items.unshift(
    {
      icon: 'mdi-account-multiple-outline',
      title: 'shippers',
      to: `/shippers`
    },
    {
      icon: 'mdi-briefcase-outline',
      title: 'carriers',
      to: `/carriers`
    }
  )
}
</script>
<template>
  <v-app-bar flat height="85">
    <div class="d-flex align-center justify-space-between w-100 px-5">
      <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon @click="$emit('toggleDrawer')" />
    </template> -->
      <div class="font-weight-bold text-secondary text-capitalize">
        <div class="d-flex align-center gap-1 cursor-pointer" @click="$router.push('/')">
          <img :src="logo" width="30" height="30" />
          <h3>dispatcher gate</h3>
        </div>
      </div>

      <div class="d-flex gap-2">
        <v-btn
          :prepend-icon="item.icon"
          :value="item.to"
          :active="route.path.includes(item.to)"
          v-for="(item, index) in items"
          :color="route.path.includes(item.to) ? 'primary' : 'base'"
          :variant="route.path.includes(item.to) ? 'tonal' : 'plain'"
          :key="index"
          @click="handleNavigation(route, item.to)"
          >{{ item.title }}
        </v-btn>
      </div>

      <!-- <v-spacer></v-spacer> -->

      <div class="d-flex ga-1 align-center">
        <suspense>
          <template #default>
            <layouts-dashboard-notifications-menu />
          </template>
        </suspense>
        <suspense>
          <template #default>
            <layouts-dashboard-user-menu />
          </template>
          <template #fallback>
            <v-skeleton-loader type="avatar"></v-skeleton-loader>
          </template>
        </suspense>
      </div>
    </div>
  </v-app-bar>
</template>

<style scoped></style>
