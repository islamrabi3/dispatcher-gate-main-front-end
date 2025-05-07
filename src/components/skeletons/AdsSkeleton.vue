<template>
  <div  class="ma-5">
    <v-skeleton-loader type="heading" class="my-2"></v-skeleton-loader>
    <v-row class="">
      <v-col v-for="num in 10" :key="num" cols="12" sm="6">
        <v-skeleton-loader type="card" class="pb-15" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
