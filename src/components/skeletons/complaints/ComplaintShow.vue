<script setup lang="ts"></script>
<template>
  <div>
    <v-row class="ma-5">
      <v-col cols="12">
        <v-skeleton-loader type="heading"></v-skeleton-loader>
      </v-col>
      <v-col cols="3" style="height: 30em">
        <v-skeleton-loader type="image" class="mt-5"></v-skeleton-loader>
        <v-skeleton-loader type="image" class=""></v-skeleton-loader>
      </v-col>
      <v-col cols="9">
        <v-skeleton-loader type="image" class="mt-5"></v-skeleton-loader>
        <v-skeleton-loader type="image" class=""></v-skeleton-loader>
        <v-skeleton-loader type="image" class=""></v-skeleton-loader>
          </v-col>
    </v-row>
  </div>
</template>

<style scoped></style>
