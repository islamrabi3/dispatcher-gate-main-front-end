<script setup lang="ts">
withDefaults(
  defineProps<{
    moduleTitle: string
    addTitle: string
    submitting: boolean
    dialog: boolean
    showAdd: boolean
    formName: string
  }>(),
  {
    showAdd: true
  }
)
defineEmits<{
  (e: 'submit', data: any): void
  (e: 'toggleDialog', state: boolean): void
}>()
</script>

<template>
  <div>
    <div class="d-flex align-center justify-space-between pb-5">
      <h1 class="text-capitalize font-weight-bold">{{ moduleTitle }}</h1>

      <v-btn
        v-if="showAdd"
        class="rounded-xl"
        flat
        color="secondary"
        prepend-icon="mdi-plus"
        @click="$emit('toggleDialog', true)"
      >
        {{ addTitle }}
      </v-btn>

      <common-common-dialog
        :title="addTitle"
        :submitting="submitting"
        :dialog="dialog"
        :form-name="formName"
        @toggleDialog="$emit('toggleDialog', false)"
      >
        <template #formd>
          <slot name="form" />
        </template>
      </common-common-dialog>
    </div>
  </div>
</template>

<style scoped></style>
