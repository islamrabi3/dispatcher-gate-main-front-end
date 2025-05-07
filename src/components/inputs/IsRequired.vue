<script setup lang="ts">
defineProps<{
  label: string
  rules: string
}>()
</script>
<template>
  <div>
    {{ label }}
    <span v-if="rules?.includes('required')" class="text-red">
      <strong>* </strong>
    </span>
  </div>
</template>

<style scoped></style>
