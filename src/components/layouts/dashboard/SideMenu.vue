<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
import { useCheckNavigation } from '@/composables/checkNavigation'

const { handleNavigation } = useCheckNavigation()
const route = useRoute()
defineProps<{
  drawer: boolean
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
    icon: 'mdi-compass-outline',
    title: 'find shipments',
    to: `/advertisements`
  },
  {
    icon: 'mdi-handshake-outline',
    title: 'offers',
    to: `/offers`
  },
  {
    icon: 'mdi-archive-outline',
    title: 'orders',
    to: `/orders`
  },
  {
    icon: 'mdi-list-box-outline',
    title: 'complaints',
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
  <v-navigation-drawer location="top" :model-value="drawer" permanent floating>
    <v-list :items="items" nav>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :prepend-icon="item.icon"
        :active="route.path.includes(item.to)"
        color="primary"
        @click="handleNavigation(route, item.to)"
      >
        <v-list-item-title class="text-capitalize">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped></style>
