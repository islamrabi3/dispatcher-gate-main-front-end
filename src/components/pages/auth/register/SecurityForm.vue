<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  submitting: boolean
  clientType: 'carrier' | 'shipper'
}>()
defineEmits<{
  (e: 'submit', data: any): void
}>()
const btnTitle = computed(() => (props.clientType === 'carrier' ? 'next' : 'submit'))
</script>
<template>
  <div>
    <pages-auth-auth-form
      :title="'register'"
      :paragraph="'please fill your security data below'"
      :height="550"
    >
      <template #form>
        <inputs-form-wrapper formId="step3-form" @submit="$emit('submit', $event)">
          <v-row class="py-5">
            <v-col cols="12" class="py-1">
              <inputs-dynamic-input
                type="text"
                jsonKey="email"
                rules="required|email"
                label="email"
              />
            </v-col>

            <v-col cols="12" class="py-1">
              <inputs-dynamic-input
                jsonKey="password"
                type="password"
                label="password"
                hint="Minimum eight characters, at least one letter, one number and one special character"
                :rules="{
                  required: true,
                  min: 8,
                  regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
                }"
              />
            </v-col>
            <v-col cols="12" class="py-1">
              <inputs-dynamic-input
                jsonKey="password confirmation"
                type="password"
                label="password confirmation"
                rules="required|confirmed:@password"
              />
            </v-col>
            <v-col cols="12" class="py-1">
              <inputs-dynamic-input jsonKey="phone" type="text" label="phone" rules="required" />
            </v-col>
            <v-col cols="12">
              <v-btn
                variant="flat"
                color="primary"
                :loading="submitting"
                type="submit"
                block
                form="step3-form"
                >
                {{ btnTitle }}
              </v-btn>
            </v-col>
          </v-row>
        </inputs-form-wrapper>
      </template>
      <template #cardImage>
        <pages-auth-register-card-image :clientType="clientType" />
      </template>
    </pages-auth-auth-form>
  </div>
</template>

<style scoped></style>
