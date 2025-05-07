<script setup lang="ts">
const role = sessionStorage.getItem('role')
</script>
<template>
  <div>
    <v-row class="ma-5">
      <v-col cols="4" style="height: 30em">
        <v-skeleton-loader type="image" class="mt-5"></v-skeleton-loader>
        <v-skeleton-loader type="image" class=""></v-skeleton-loader>
        <v-skeleton-loader type="image" class=""></v-skeleton-loader>
      </v-col>
      <v-col v-if="role === 'carrier' || role === 'admin'" cols="8">
        <v-skeleton-loader type="heading"></v-skeleton-loader>
        <v-skeleton-loader type="list-item" class="my-5"></v-skeleton-loader>
        <v-skeleton-loader type="list-item" class="my-5"></v-skeleton-loader>
        <v-skeleton-loader type="image" class="mt-5"></v-skeleton-loader>
        <v-skeleton-loader type="image" class=""></v-skeleton-loader>
        <v-skeleton-loader type="image" class=""></v-skeleton-loader>
        <v-skeleton-loader type="image" class=""></v-skeleton-loader>
        <v-skeleton-loader type="image" class=""></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
