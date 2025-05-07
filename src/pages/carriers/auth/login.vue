<script setup lang="ts">
import bg from '@/assets/bg.jpg'
</script>
<template>
  <pages-auth-auth-form
    :title="'login'"
    :paragraph="'welcome again, login to get started'"
    :height="450"
  >
    <template #form>
      <pages-auth-login-login-form role="carriers" />
    </template>
    <template #cardImage>
      <div :style="{ backgroundImage: `url(${bg})`, backgroundSize: 'cover' }" class="pa-5 h-100">
        <h2 class="text-capitalize text-center mt-5 text-white">dispatcher gate</h2>
        <p class="text-center text-grey-lighten-1">Connecting shippers and carriers</p>
      </div>
    </template>
  </pages-auth-auth-form>
</template>

<style scoped></style>
