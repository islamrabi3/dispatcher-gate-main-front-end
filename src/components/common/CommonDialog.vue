<script setup lang="ts">
withDefaults(
  defineProps<{
    dialog: boolean
    title: string
    submitting: boolean
    width?: number
    formName: string
  }>(),
  {
    width: 750
  }
)
</script>
<template>
  <v-dialog :width="width" scrollable :model-value="dialog" persistent>
    <v-card class="rounded-lg">
      <v-card-title class="text-capitalize font-weight-bold">{{ title }}</v-card-title>
      <v-card-text>
        <slot name="formd" />
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-spacer></v-spacer>

        <v-btn
          text="submit"
          color="primary"
          class="w-100"
          variant="flat"
          rounded="xl"
          type="submit"
          :form="formName"
          :loading="submitting"
        ></v-btn>
        <v-btn
          text="cancel"
          color="primary"
          rounded="xl"
          class="w-100"
          :variant="'text'"
          @click="$emit('toggleDialog', false)"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
