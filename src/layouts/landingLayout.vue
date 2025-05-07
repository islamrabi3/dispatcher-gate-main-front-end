<script setup lang="ts">
import logo from '@/assets/Mylogo.png'
import router from '@/router'
import { ref } from 'vue'
import { useCheckNavigation } from '@/composables/checkNavigation'
const drawer = ref(false)
const routes = [
  { name: 'about us', to: '/about-us' },
  { name: 'shippers', to: '/landing/shippers' },
  { name: 'carriers', to: '/landing/carriers' },
  { name: 'FAQ', to: '/faq' },
  { name: 'contact us', to: '' }
]
const token = sessionStorage.getItem('token')
</script>

<template>
  <div>
    <v-layout>
      <v-navigation-drawer class="d-md-none" :model-value="drawer" temporary>
        <v-list :items="routes" nav>
          <v-list-item v-for="(item, index) in routes" :key="index" color="primary" :to="item.to">
            <v-list-item-title class="text-capitalize">
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar class="px-5 px-md-10 py-2" elevation="3">
        <div class="d-flex align-center gap-1 cursor-pointer" @click="router.push('/')">
          <img :src="logo" width="30" height="30" />
          <v-app-bar-title class="text-capitalize font-weight-bold text-secondary"
            >Dispatcher Gate
          </v-app-bar-title>
        </div>
        <div class="d-none mx-10 d-md-flex items-center justify-center ga-5 text-capitalize">
          <router-link
            v-for="(route, index) in routes"
            :key="index"
            :to="route.to"
            class="text-decoration-none text-black text-body-2 text-capitalize"
            >{{ route.name }}</router-link
          >
        </div>

        <v-spacer class="d-none d-md-block"></v-spacer>

        <div v-if="!token" class="d-flex gap-1">
          <v-btn link to="/auth/register" color="primary" variant="flat" class="d-none d-md-flex">
            register
          </v-btn>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                color="primary"
                append-icon="mdi-chevron-down"
                class="d-none font-weight-bold d-md-flex"
              >
                login
              </v-btn>
            </template>
            <v-list>
              <v-list-item link to="/shippers/auth/login">
                <v-list-item-title>shipper</v-list-item-title>
              </v-list-item>
              <v-list-item link to="/carriers/auth/login">
                <v-list-item-title>carrier</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div v-else>
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

        <template v-slot:append>
          <v-app-bar-nav-icon class="d-md-none" @click="drawer = !drawer" />
        </template>
      </v-app-bar>

      <v-main>
        <router-view v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
        <v-footer class="bg-secondary text-center d-flex flex-column">
          <div
            class="d-flex flex-column flex-md-row justify-space-between align-start w-100 pa-md-5 py-10"
          >
            <div class="text-center text-md-start" style="max-width: 30em">
              <h3 class="text-capitalize text-h5 font-weight-bold">dispatcher gate</h3>
              <div class="py-2 text-body-2 text-grey-lighten-2">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus
                commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc
              </div>
            </div>
            <div class="text-start">
              <div class="w-100 d-flex justify-center justify-md-end">
                <v-btn
                  v-for="icon in ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']"
                  :key="icon"
                  class="mx-0"
                  :icon="icon"
                  size="x-large"
                  variant="text"
                ></v-btn>
              </div>
              <div class="text-capitalize">
                <p>address:</p>
                <p>contact us:</p>
              </div>
            </div>
          </div>

          <div
            class="d-none mx-10 d-md-flex align-start justify-start gap-2 text-capitalize text-body-2"
          >
            <router-link
              v-for="(route, index) in routes"
              :key="index"
              class="text-decoration-none text-white"
              :to="route.to"
            >
              {{ route.name }}
            </router-link>
          </div>

          <v-divider></v-divider>

          <div class="pt-5 text-caption text-grey-lighten-1">
            {{ new Date().getFullYear() }} &copy;
            <span class="text-capitalize">all copyrights reserved</span>
          </div>
        </v-footer>
      </v-main>
    </v-layout>
  </div>
</template>

<style scoped></style>
