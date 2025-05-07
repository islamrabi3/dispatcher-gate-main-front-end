<template>
  <div>
    <Suspense>
      <template #default>
        <pages-shared-offers-show-module />
      </template>
      <template #fallback>
        <div class="ma-5">
          <div class="pb-5">
            <v-skeleton-loader type="heading"></v-skeleton-loader>
          </div>
          <v-card elevation="0" class="rounded-lg">
            <v-row class="py-4">
              <v-col v-for="n in 20" :key="n" cols="12" sm="6">
                <v-skeleton-loader type="text" />
              </v-col>
            </v-row>
          </v-card>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: 'dashboardLayout'
</route>
