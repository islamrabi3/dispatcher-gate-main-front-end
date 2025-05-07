<template>
  <div>
    <Suspense>
      <template #default>
        <pages-shared-ads-index-module />
      </template>
      <template #fallback>
        <skeletons-table-skeleton />
      </template>
    </Suspense>
  </div>
</template>



<route lang="yaml">
meta:
  layout: 'dashboardLayout'
</route>
