<script setup lang="ts"></script>
<template>
  <div>
    <Suspense>
      <template #default>
        <pages-admin-carriers-index-module></pages-admin-carriers-index-module>
      </template>
      <template #fallback>
        <skeletons-table-skeleton />
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: 'dashboardLayout'
</route>
