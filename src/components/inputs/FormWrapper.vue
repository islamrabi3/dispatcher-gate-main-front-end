<script setup lang="ts">
import { type GenericObject, Form as VeeForm } from 'vee-validate'
defineProps<{
  formId: String
}>()

const emit = defineEmits<{
  (e: 'submit', data: any): void
}>()

const onSubmit = (data: any) => {
  emit('submit', data)
}
</script>
<template>
  <VeeForm v-slot="{ handleSubmit }">
    <v-form @submit.prevent="handleSubmit($event, onSubmit)" :id="formId">
      <slot />
    </v-form>
  </VeeForm>
</template>
