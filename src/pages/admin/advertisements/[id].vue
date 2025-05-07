<template>
  <div>
    <Suspense>
      <template #default>
        <pages-shared-ads-ad-show />
      </template>
      <template #fallback>
        <skeletons-ads-ad-show />
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: 'dashboardLayout'
</route>
