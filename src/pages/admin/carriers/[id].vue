<script setup lang="ts"></script>

<template>
  <div>
    <Suspense>
      <template #default>
        <pages-admin-carriers-show-module />
      </template>
      <template #fallback>
        <skeletons-profile-show-skeleton />
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: 'dashboardLayout'
</route>
