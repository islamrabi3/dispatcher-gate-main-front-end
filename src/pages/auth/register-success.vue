<template>
  <v-container class="d-flex justify-center align-center h-screen">
    <v-card width="400" class="d-flex flex-column justify-center align-center rounded-lg">
      <v-icon icon="mdi-check-circle-outline" size="100" color="secondary"> </v-icon>

      <v-card-title class="font-weight-bold text-capitalize text-wrap text-center">
        you have successfully completed registration
      </v-card-title>

      <v-card-subtitle> welcome! to dispatcher gate platform </v-card-subtitle>

      <v-col>
        <v-btn block class="rounded-lg" color="primary" variant="flat" to="/"
          >go to dashboard</v-btn
        >
      </v-col>
    </v-card>
  </v-container>
</template>

<script setup lang="ts"></script>

<style scoped></style>
