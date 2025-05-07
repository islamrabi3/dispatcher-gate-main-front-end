<template>
  <div class="d-flex flex-column align-center justify-center" style="height: 25em">
    <v-icon :icon="icon" color="secondary" size="80"></v-icon>
    <h3 class="text-capitalize">{{ title }}</h3>
    <p class="text-center text-grey-darken-1 mt-2" style="width: 20em">
      {{ label }}
    </p>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    title: string
    icon?: string
  }>(),
  {
    title: 'no results',
    icon: 'mdi-archive'
  }
)
</script>

<style scoped></style>
