<template>
  <v-layout>
    <!-- TOP NAVIGATION -->
    <layouts-dashboard-top-bar @toggle-drawer="drawer = !drawer" />
    <!-- <layouts-dashboard-side-menu :drawer="drawer" /> -->
    <v-main>
      <page-view />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">

import { ref } from 'vue'
const drawer = ref(true)
</script>

<style scoped></style>



