<script setup lang="ts">
import image from '@/assets/faq.jpg'
</script>
<template>
  <v-row class="d-flex px-5 pt-5 align-center">
    <v-col cols="6" class="d-flex align-center flex-column justify-center">
      <h1 class="text-capitalize text-center py-10">Frequently asked questions</h1>

      <v-expansion-panels style="width: 40em">
        <v-expansion-panel
          title="How do I sign up?"
          text="complete the online application. We will review your application and contact you as soon as possible."
        >
        </v-expansion-panel>
        <v-expansion-panel
          title="What are the requirements to be a carrier?"
          text="cargo insurance per vehicle hauled is $35,000 ($50,000 is preferred but less is accepted). For instance, if they can haul a total of 10 vehicles, it is recommended that they have at least $350,000 cargo coverage"
        >
        </v-expansion-panel>
        <v-expansion-panel
          title="How many carriers use dispatcher gate?"
          text="Over 13,000 car carriers with over 40,000 trucks use Central Dispatch to find vehicles to ship each week."
        >
        </v-expansion-panel>
        <v-expansion-panel
          title="How do I become an auto transport carrier?"
          text="Carriers are licensed by the U.S. Department of Transportation. Visit www.dot.gov to learn more."
        >
        </v-expansion-panel>
        <v-expansion-panel
          title="When can I expect my login information?"
          text="Once we have successfully processed your application, you will receive your login information via email. We will also contact you to confirm that you received your username and password and help you with any questions you might have."
        >
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col cols="6" class="h-screen pa-0">
      <v-img :src="image" class="h-screen image" cover />
    </v-col>
  </v-row>
</template>

<style scoped>
.image {
  object-fit: cover !important;
  object-position: right !important;
}
</style>

<route lang="yaml">
meta:
  layout: landingLayout
</route>
