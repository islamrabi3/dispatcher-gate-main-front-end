<script setup lang="ts">
import { ref } from 'vue'
const showPassword = ref(false)
const props = defineProps<{
  modelValue: string | undefined
  label?: string
  hint?: string
}>()
defineEmits<{
  (e: 'update:modelValue', data: string): void
}>()
</script>

<style scoped></style>

<template>
  <v-text-field
    v-bind="props"
    :type="showPassword ? 'text' : 'password'"
    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
    variant="outlined"
    density="comfortable"
    :hide-details="'auto'"
    :label="label"
    :error-messages="hint"
    @click:append-inner="showPassword = !showPassword"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <template #label>
      <inputs-is-required :label="label" :rules="'required'" />
    </template>
  </v-text-field>
</template>
