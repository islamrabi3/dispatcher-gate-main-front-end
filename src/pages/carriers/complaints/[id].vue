<template>
  <div>
    <Suspense>
      <template #default>
        <pages-shared-complaints-show-module />
      </template>
      <template #fallback>
        <skeletons-complaints-complaint-show></skeletons-complaints-complaint-show>
      </template>
    </Suspense>
  </div>
</template>

<style scoped></style>

<route lang="yaml">
meta:
  layout: 'dashboardLayout'
</route>
