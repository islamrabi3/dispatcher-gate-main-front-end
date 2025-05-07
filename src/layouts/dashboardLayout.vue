<script setup lang="ts"></script>
<template>
  <v-app>
    <suspense>
      <template #default>
        <layouts-dashboard-main-layout></layouts-dashboard-main-layout>
      </template>
      <template #fallback> </template>
    </suspense>
  </v-app>
</template>

<style scoped></style>
