<script setup lang="ts">
import FullLogo from '@/assets/fullLogo.png'
withDefaults(
  defineProps<{
    title: string
    paragraph: string
    height: number
    image: boolean
    scrollable: boolean
  }>(),
  {
    image: true
  }
)
</script>

<template>
  <v-container class="d-flex justify-center align-center h-screen">
    <v-card width="750" :height="height" rounded="xl">
      <v-row class="h-100">
        <!-- 👉 HEADER -->
        <v-col cols="12" :sm="image ? 6 : 12" class="pa-10">
          <v-img :src="FullLogo" width="100"></v-img>
          <v-card-title class="px-0 text-capitalize font-weight-black"> {{ title }} </v-card-title>
          <v-card-subtitle class="px-0 text-capitalize">
            {{ paragraph }}
          </v-card-subtitle>
          <slot name="form" />
        </v-col>
        <v-col cols="12" sm="6" v-if="image" style="height: 106%">
          <!-- <pages-auth-login-card-image /> -->
          <slot name="cardImage" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
