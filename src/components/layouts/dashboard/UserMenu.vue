<script setup lang="ts">
import { setImageUrl } from '@/utils'
import { useProfileStore } from '@/stores/profile'
import router from '@/router'
import { useRoute } from 'vue-router/auto'

const route = useRoute()
const profileStore = useProfileStore()
const role = sessionStorage.getItem('role')

const items = [
  route.path !== '/'
    ? {
        icon: 'mdi-home-outline',
        title: 'home',
        action() {
          return router.push(`/`)
        }
      }
    : {
        icon: 'mdi-view-dashboard-outline',
        title: 'dashboard',
        action() {
          return router.push(
            `${role === 'shipper' ? '/shippers/advertisements' : role === 'carrier' ? '/carriers/advertisements' : '/admin/advertisements'}`
          )
        }
      },
  {
    icon: 'mdi-logout',
    title: 'logout',
    action() {
      sessionStorage.removeItem('token')
      location.reload()
    }
  }
]
await profileStore.getProfileData()

if (role !== 'admin') {
  items.splice(1, 0, {
    icon: 'mdi-account-outline',
    title: 'my profile',
    action() {
      return router.push(
        `/${role === 'shipper' ? 'shippers' : role === 'carrier' ? 'carriers' : 'admin'}/profile`
      )
    }
  })
}
</script>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon color="primary" class="mx-5">
        <v-avatar
          v-bind="props"
          color="primary"
          icon="mdi-account-outline"
          :image="setImageUrl(profileStore.profileData!.data?.image_url)"
        ></v-avatar>
      </v-btn>
    </template>
    <v-card width="220">
      <v-list>
        <v-list-item>
          <div class="d-flex gap-2">
            <v-avatar
              color="primary"
              icon="mdi-account-outline"
              :image="setImageUrl(profileStore.profileData!.data?.image_url)"
            >
            </v-avatar>
            <div class="mb-2">
              <v-list-item-title>{{ profileStore.profileData!.data?.name }}</v-list-item-title>
              <v-list-item-subtitle>{{
                profileStore.profileData!.data?.role
              }}</v-list-item-subtitle>
            </div>
          </div>
        </v-list-item>

        <v-divider></v-divider>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :prepend-icon="item.icon"
          :value="index"
          @click="item.action"
        >
          <v-list-item-title class="text-capitalize">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<style scoped></style>
