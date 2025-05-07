<script setup lang="ts">
import landing from '@/assets/landing.jpg'
import car from '@/assets/car.png'
import goods from '@/assets/household-goods.png'
import heavy from '@/assets/heavy-transport.png'
import cat from '@/assets/cat.png'
import section2bg from '@/assets/section-2-bg.jpg'
import section3bg from '@/assets/section-3-bg.jpg'
</script>

<template>
  <div>
    <v-main class="py-4">
      <section
        class="d-flex justify-space-between align-start py-10 align-md-center px-5 pa-md-10"
        :style="{
          backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0,0.9)),url(${landing})`,
          backgroundSize: 'cover',
          minHeight: '35em',
          backgroundPosition: 'center'
        }"
      >
        <v-row class="d-flex align-start justify-start w-100">
          <v-col cols="12" md="5" class="d-flex flex-column align-start justify-center">
            <h1 class="text-md-h3 text-h4 text-white font-weight-bold pb-5">
              SHIPPERS, <br />
              MEET CARRIERS.
            </h1>
            <h1 class="text-md-h3 text-h4 text-white font-weight-bold pb-5">
              CARRIERS, <br />
              MEET SHIPPERS.
            </h1>
            <p class="text-grey-lighten-2 text-md-body-1 text-body-2">
              We make shipping big stuff cheap and easy by helping customers directly connect with
              providers who have extra truck space.
            </p>
            <div class="d-flex flex-column flex-md-row gap-2 justify-center align-center mt-10">
              <v-btn variant="flat" color="primary" size="large" link to="/auth/register">
                get free estimate
              </v-btn>

              <v-btn variant="outlined" color="primary" size="large" link to="/auth/register"
                >become a carrier
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </section>
      <section class="w-100 pa-10 d-flex flex-wrap justify-center justify-md-space-between">
        <div class="d-flex flex-column align-center justify-center">
          <v-img :src="car" alt="" width="150" />
          <h5 class="text-uppercase font-weight-medium text-center" style="letter-spacing: 0.1em">
            Vehicles and boats
          </h5>
        </div>
        <div class="d-flex flex-column align-center justify-center">
          <v-img :src="goods" alt="" width="150" />
          <h5 class="text-uppercase font-weight-medium text-center" style="letter-spacing: 0.1em">
            household goods
          </h5>
        </div>
        <div class="d-flex flex-column align-center justify-center">
          <v-img :src="heavy" alt="" width="150" />
          <h5 class="text-uppercase font-weight-medium" style="letter-spacing: 0.1em">
            heavy transport
          </h5>
        </div>
        <div class="d-flex flex-column align-center justify-center">
          <v-img :src="cat" alt="" width="150" />
          <h5 class="text-uppercase font-weight-medium text-center" style="letter-spacing: 0.1em">
            animals
          </h5>
        </div>
      </section>
      <section
        class="bg-primary w-100 d-flex flex-column align-center justify-center my-5 pa-15"
        style="height: 13em"
      >
        <div class="d-flex gap-2 justify-space-between" style="width: 75%">
          <div class="d-flex ga-2">
            <h4 class="text-h3 font-weight-bold">6M</h4>
            <div>
              <p style="letter-spacing: 0.2em" class="text-capitalize">shipping</p>
              <p style="letter-spacing: 0.2em" class="text-capitalize">customer</p>
            </div>
          </div>
          <div class="d-none d-md-flex ga-2">
            <h4 class="text-h3 font-weight-bold">4,000</h4>
            <div>
              <p style="letter-spacing: 0.2em" class="text-capitalize">service</p>
              <p style="letter-spacing: 0.2em" class="text-capitalize">providers</p>
            </div>
          </div>
          <div class="d-none d-md-flex ga-2">
            <h4 class="text-h3 font-weight-bold">9.1M</h4>
            <div>
              <p style="letter-spacing: 0.2em">shipment</p>
              <p style="letter-spacing: 0.2em">listings</p>
            </div>
          </div>
        </div>
      </section>

      <section class="d-flex justify-space-between align-center pa-10 py-15">
        <v-row class="d-flex flex-column flex-md-row align-center justify-center w-100">
          <v-col cols="12" md="6" class="d-flex flex-column align-start justify-start">
            <h1 class="text-h4 font-weight-bold pb-3">PICK YOUR PROVIDER AND PRICE</h1>

            <p class="text-body-1 text-grey-darken-1">
              We make shipping big stuff cheap and easy by helping customers directly connect with
              providers who have extra truck space.
            </p>
          </v-col>
          <v-col cols="12" md="6" class="d-flex flex-column align-start justify-start">
            <v-img :src="section2bg" class="w-100 rounded-lg"></v-img>
          </v-col>
        </v-row>
      </section>
      <section
        class="bg-primary w-100 d-flex align-center justify-center pa-10"
        style="height: 13em"
      >
        <div class="d-flex gap-2 justify-space-between" style="width: 75%">
          <div class="d-flex align-start justify-center ga-2">
            <v-icon icon="mdi-security" size="45" color="white"></v-icon>
            <div>
              <p style="letter-spacing: 0.2em" class="text-capitalize">smart</p>
              <p style="letter-spacing: 0.2em" class="text-capitalize">shipping</p>
            </div>
          </div>
          <div class="d-none d-md-flex align-start justify-center ga-2">
            <v-icon icon="mdi-arrow-up-circle" size="45" color="white"></v-icon>
            <div>
              <p style="letter-spacing: 0.2em" class="text-capitalize">easy</p>
              <p style="letter-spacing: 0.2em" class="text-capitalize">tracking</p>
            </div>
          </div>
          <div class="d-none d-md-flex align-start justify-center ga-2">
            <v-icon icon="mdi-credit-card" size="45" color="white"></v-icon>
            <div>
              <p style="letter-spacing: 0.2em" class="text-capitalize">secure</p>
              <p style="letter-spacing: 0.2em" class="text-capitalize">payments</p>
            </div>
          </div>
        </div>
      </section>
      <section class="d-flex justify-space-between align-center pa-10 py-15">
        <v-row class="d-flex flex-column flex-md-row-reverse align-center justify-center w-100">
          <v-col cols="12" md="6" class="d-flex flex-column">
            <h1 class="text-h4 font-weight-bold pb-5">BE THE MASTER OF YOUR DOMAIN</h1>

            <p class="text-grey-darken-1 text-body-1">
              With new shipments posted every 30 seconds, there’s always money to be made on uShip.
              Find lucrative jobs through the latest tools, no matter what you haul.
            </p>
          </v-col>
          <v-col cols="12" md="6" class="d-flex flex-column align-start justify-start">
            <v-img :src="section3bg" class="w-100 rounded-lg"></v-img>
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
