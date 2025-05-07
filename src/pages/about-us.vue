<script setup lang="ts">
import section1Image from '@/assets/aboutus-1.jpg'
import section2Image from '@/assets/aboutus-2.jpg'
import section3Image from '@/assets/aboutus-3.jpg'
</script>

<template>
  <div>
    <v-main class="pt-4">
      <section class="d-flex justify-space-between align-start py-10 align-md-center px-5 pa-md-10">
        <v-row class="d-flex align-center justify-space-between w-100">
          <v-col cols="12" md="5" class="d-flex flex-column align-start justify-center">
            <h1 class="text-md-h3 text-h4 font-weight-bold pb-5">Our History</h1>

            <p class="text-grey-darken-2 text-md-body-1 text-body-2">
              we came online in 1999 as a way for vehicle shippers to easily connect with car
              carriers. It has since transformed the auto transport industry, taking it from relying
              on paper, faxes, and phones, to utilizing an efficient central database on the
              Internet.
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
            <h1 class="text-md-h3 text-h4 font-weight-bold pb-5">Easy to Use</h1>

            <p class="text-grey-darken-2 text-md-body-1 text-body-2">
              Post and search for vehicles with the click of a button. Carriers get complete
              shipping information — origin, destination, vehicle description, ship date, company
              name and phone, etc. All members can get details about any company in our system,
              including contact information, equipment and insurance (for carriers), ICC MC number,
              references, and much more.
            </p>
          </v-col>
        </v-row>
      </section>
      <section class="d-flex justify-space-between align-start pt-10 align-md-center">
        <v-row class="d-flex align-center justify-space-between w-100 bg-primary pa-12">
          <v-col cols="12" md="5" class="d-flex flex-column align-start justify-center">
            <h1 class="text-md-h3 text-h4 font-weight-black pb-5 text-uppercase">Sign Up Now</h1>

            <p class="text-grey-lighten-3 text-md-body-1 text-body-2">
              Sign up today! Car carriers, brokers, dealers, auto auctions, manufacturers and rental
              agencies can apply for a CentralDispatch® username and password by going directly to
              our sign up page.
            </p>
            <v-btn color="secondary" size="large" link to="/auth/register" flat class="my-10">
              join us now
            </v-btn>
          </v-col>
          <v-col cols="12" md="5">
            <v-img :src="section3Image" class="w-100 rounded-lg" height="500" cover></v-img>
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
