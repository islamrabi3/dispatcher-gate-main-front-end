<script setup lang="ts">
import bg from '@/assets/admin-bg.jpg'
</script>
<template>
  <div>
    <pages-auth-auth-form
      :title="'login'"
      :paragraph="'welcome again, login to get started'"
      :height="450"
    >
      <template #form>
        <pages-auth-login-login-form role="admin" />
      </template>
      <template #cardImage>
        <div
          :style="{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0,0.7)),url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }"
          class="pa-5 h-100"
        >
          <h2 class="text-capitalize text-center mt-5 text-white">dispatcher gate</h2>
          <p class="text-center text-grey-lighten-1">managing shippers and carriers</p>
        </div>
      </template>
    </pages-auth-auth-form>
  </div>
</template>

<style scoped></style>
