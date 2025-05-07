<script setup lang="ts"></script>
<template>
  <div>
    <Suspense>
      <template #default>
        <pages-profile-profile-card></pages-profile-profile-card>
      </template>
      <template #fallback>
        <skeletons-profile-show-skeleton></skeletons-profile-show-skeleton>
      </template>
    </Suspense>
  </div>
</template>

<route lang="yaml">
meta:
  layout: 'dashboardLayout'
</route>

<style scoped></style>
