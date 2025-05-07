<script setup lang="ts">
import { ref } from 'vue'
import { signup, signupCourier } from '@/services/auth'
import { jsonToFormData } from '@/utils/index'
import { useRouter } from 'vue-router/auto'
import axios from 'axios'

const router = useRouter()

const steps = ref<1 | 2 | 3 | 4 | 5>(1)
const submitting = ref(false)
const formData = ref({})

const incrementSteps = () => {
  steps.value++
}
const handleNextSubmit = ($event: any) => {
  formData.value = { ...formData.value, ...$event }
  incrementSteps()
}

const clientType = ref('')
const handleSubmit = async (data: any) => {
  submitting.value = true
  const res =
    clientType.value === 'shipper'
      ? await signup(jsonToFormData({ ...data, ...formData.value }))
      : await signupCourier(jsonToFormData({ ...data, ...formData.value }))
  submitting.value = false
  if (res?.status === 200 || res?.status === 201) {
    sessionStorage.setItem('token', res?.data.token)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + res?.data.token
    router.push('/auth/register-success')
  }
}

const handleClientType = (event: string) => {
  clientType.value = event
  incrementSteps()
}
</script>
<template>
  <div>
    <!-- SHIPPER,COURIER FORM -->
    <div v-show="steps === 1">
      <pages-auth-register-shipper-courier-form @submit="handleClientType($event)" />
    </div>
    <!-- PERSONAL INFORMATION -->
    <div v-show="steps === 2">
      <pages-auth-register-personal-info-form
        :client-type="clientType"
        @next-step="handleNextSubmit($event)"
      />
    </div>
    <!-- LOCATION -->
    <div v-show="steps === 3">
      <pages-auth-register-location-form
        :client-type="clientType"
        @next-step="handleNextSubmit($event)"
      />
    </div>
    <!-- SECURITY -->
    <div v-show="steps === 4">
      <pages-auth-register-security-form
        :submitting="submitting"
        :client-type="clientType"
        @submit="clientType === 'shipper' ? handleSubmit($event) : handleNextSubmit($event)"
      />
    </div>
    <!-- CERTIFICATES -->
    <div v-show="steps === 5">
      <pages-auth-register-certificates-form
        :submitting="submitting"
        @submit="handleSubmit($event)"
      />
    </div>
  </div>
</template>
