<script setup lang="ts">
import section1Image from '@/assets/aboutus-1.jpg'
import section2Image from '@/assets/aboutus-2.jpg'
</script>

<template>
  <div>
    <v-main class="pa-4">
      <v-col cols="6">
        <h1 class="mt-10 text-h3 font-weight-bold" style="border-bottom: 0.15em solid #f78e0f">
          How It Works For Carriers
        </h1>
      </v-col>

      <section class="d-flex justify-space-between align-start py-10 align-md-center px-5 pa-md-10">
        <v-row class="d-flex align-center justify-space-between w-100">
          <v-col cols="12" md="5" class="d-flex flex-column align-start justify-center">
            <h1 class="text-md-h3 text-h4 font-weight-bold pb-5">Step 1</h1>

            <p class="text-grey-darken-2 text-md-body-1 text-body-2">
              navigate through thousands of shippers ads
            </p>
          </v-col>
          <v-col cols="12" md="5">
            <v-img :src="section1Image" class="rounded-lg" height="500" cover></v-img>
          </v-col>
        </v-row>
      </section>
      <section class="d-flex justify-space-between align-start py-10 align-md-center px-5 pa-md-10">
        <v-row class="d-flex align-center justify-space-between w-100">
          <v-col cols="12" md="5">
            <v-img :src="section2Image" class="w-100 rounded-lg" height="500" cover></v-img>
          </v-col>
          <v-col cols="12" md="5" class="d-flex flex-column align-start justify-center">
            <h1 class="text-md-h3 text-h4 font-weight-bold pb-5">step 2</h1>

            <p class="text-grey-darken-2 text-md-body-1 text-body-2">
              send offers and accept most compiling one
            </p>
          </v-col>
        </v-row>
      </section>
      <section class="d-flex justify-space-between align-start py-10 align-md-center px-5 pa-md-10">
        <v-row class="d-flex align-center justify-space-between w-100">
          <v-col cols="12" md="5" class="d-flex flex-column align-start justify-center">
            <h1 class="text-md-h3 text-h4 font-weight-bold pb-5">Step 3</h1>

            <p class="text-grey-darken-2 text-md-body-1 text-body-2">
              control the status of the order and deliver and collect your payment
            </p>
          </v-col>
          <v-col cols="12" md="5">
            <v-img :src="section1Image" class="rounded-lg" height="500" cover></v-img>
          </v-col>
        </v-row>
      </section>
    </v-main>
  </div>
</template>

<route lang="yaml">
meta:
  layout: 'landingLayout'
</route>
