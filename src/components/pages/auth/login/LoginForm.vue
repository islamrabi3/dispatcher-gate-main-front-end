<script setup lang="ts">
import { ref } from 'vue'
import { type GenericObject } from 'vee-validate'
import DynamicInput from '@/components/inputs/DynamicInput.vue'
import { loginAdmin, loginCarrier, loginShipper } from '@/services/auth'

const props = defineProps<{
  role: 'admin' | 'shippers' | 'carriers'
}>()

const loading = ref(false)

const checkRoleApi = async (data: any) => {
  return props.role === 'admin'
    ? await loginAdmin(data)
    : props.role === 'shippers'
      ? await loginShipper(data)
      : await loginCarrier(data)
}
const onSubmit = async ($event: GenericObject) => {
  loading.value = true
  const res = await checkRoleApi($event)
  if (res!.status !== 403 && res?.data.token) {
    sessionStorage.setItem('token', res?.data.token)
    sessionStorage.setItem('role', res?.data.role)
    location.reload()
  }
}
</script>
<template>
  <div>
    <inputs-form-wrapper :form-id="'login-form'" @submit="onSubmit">
      <v-row class="py-5">
        <v-col cols="12">
          <dynamic-input
            :type="'text'"
            json-key="email"
            :label="'Email'"
            :hint="'write your email address'"
            :placeholder="'example@example.com'"
            :rules="'email|required'"
          />
        </v-col>
        <v-col cols="12">
          <dynamic-input
            :label="'password'"
            :type="'password'"
            json-key="password"
            :rules="'required'"
          />
        </v-col>
        <v-col cols="12" class="py-0">
          <router-link to="/auth/register" class="text-caption text-capitalize text-secondary">
            Don't have an Account?
          </router-link>
        </v-col>
        <!-- <v-col cols="12" class="py-0">
          <router-link
            to="/auth/forgot-password"
            class="text-caption text-capitalize text-secondary"
          >
            forgot password?
          </router-link>
        </v-col> -->
        <v-col cols="12" class="pb-2">
          <v-btn
            variant="flat"
            color="primary"
            type="submit"
            form="login-form"
            :loading="loading"
            block
          >
            login
          </v-btn>
        </v-col>
        <v-col cols="12" class="pa-0">
          <v-btn
            variant="text"
            color="primary"
            link
            to="/"
            class="font-weight-bold"
            prepend-icon="mdi-arrow-left"
            block
          >
            return to home page
          </v-btn>
        </v-col>
      </v-row>
    </inputs-form-wrapper>
  </div>
</template>
