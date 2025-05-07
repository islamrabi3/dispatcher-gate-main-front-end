<script setup lang="ts">
import { Field } from 'vee-validate'

interface VuetifyInput {
  'hide-details': string
  variant:
    | 'outlined'
    | 'filled'
    | 'plain'
    | 'underlined'
    | 'solo'
    | 'solo-inverted'
    | 'solo-filled'
    | undefined
  density: 'compact' | 'comfortable' | 'default'
  label?: string
  hint?: string
  placeholder?: string
}

const props = defineProps<{
  type: 'text' | 'password' | 'file' | 'select' | 'textarea' | 'date' | 'rating' | 'map'
  jsonKey: string
  rules?: string
  label?: string
  hint?: string
  placeholder?: string
  items?: Array<any>
  loading?: boolean
  itemValue?: string
  itemTitle?: string
  inputType?: string
  value?: any
  accept?: string
  innerIcon?: string
  prefix?: string
  suffix?: string
}>()

defineEmits<{
  (e: 'get:modelValue', data: any): void
  (e: 'setPlace', data: any): void
}>()

const commonProps: VuetifyInput = {
  'hide-details': 'auto',
  variant: 'outlined',
  density: 'comfortable',
  label: props.label,
  hint: props.hint,
  placeholder: props.placeholder
}
</script>
<template>
  <Field
    :name="jsonKey"
    :rules="rules"
    v-slot="{ field, errors, handleChange }"
    :model-value="value"
  >
    <v-text-field
      v-if="type === 'text'"
      v-bind="commonProps"
      :suffix="suffix"
      :prefix="prefix"
      :type="inputType"
      :model-value="field.value"
      :error-messages="errors"
      class="rounded-xl"
      @update:model-value="handleChange($event), $emit('get:modelValue', $event)"
    >
      <template #label>
        <inputs-is-required :label="label" :rules="rules" />
      </template>
    </v-text-field>
    <v-file-input
      v-if="type === 'file'"
      v-bind="commonProps"
      :accept="accept"
      :prefix="prefix"
      :suffix="suffix"
      :model-value="field.value"
      :error-messages="errors"
      chips
      :prepend-icon="''"
      :append-inner-icon="innerIcon"
      @update:model-value="handleChange($event), $emit('get:modelValue', $event)"
    >
      <template #label> <inputs-is-required :label="label" :rules="rules" /> </template>
    </v-file-input>

    <v-autocomplete
      v-if="type === 'select'"
      v-bind="commonProps"
      :model-value="field.value"
      :error-messages="errors"
      :prefix="prefix"
      :suffix="suffix"
      :items="items"
      :item-title="itemTitle"
      :item-value="itemValue"
      :loading="loading"
      @update:model-value="handleChange($event), $emit('get:modelValue', $event)"
    >
      <template #label>
        <inputs-is-required :label="label" :rules="rules" />
      </template>
    </v-autocomplete>
    <v-textarea
      v-if="type === 'textarea'"
      v-bind="commonProps"
      :model-value="field.value"
      :prefix="prefix"
      :suffix="suffix"
      :error-messages="errors"
      @update:model-value="handleChange($event), $emit('get:modelValue', $event)"
    >
      <template #label>
        <inputs-is-required :label="label" :rules="rules" />
      </template>
    </v-textarea>
    <inputs-password-input
      v-if="type === 'password'"
      :model-value="field.value"
      :label="label"
      :hint="hint"
      :error-messages="errors"
      @update:model-value="handleChange"
    />

    <v-rating
      v-if="type === 'rating'"
      v-bind="commonProps"
      hover
      :length="5"
      :size="49"
      :model-value="field.value"
      :error-messages="errors"
      @update:model-value="handleChange"
      active-color="primary"
    />
    <div v-if="type === 'map'">
      <GMapAutocomplete
        :placeholder="`${props.label}*`"
        @place_changed="handleChange($event.address_components[0].long_name)"
        class="w-100 h-100 map-autocomplete"
      >
      </GMapAutocomplete>
      <p class="text-red text-caption">{{ errors[0] }}</p>
    </div>
  </Field>
</template>

<style>
.map-autocomplete {
  border: solid 1px #ababab;
  padding: 0.5em;
  border-radius: 0.28em;
}
</style>
