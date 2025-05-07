<template>
  <div class="app-background">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<!-- <style scoped>
.app-background {
  background-image: url('@/assets/dots.png');
  background-repeat: repeat;
  background-size: cover;
}
</style> -->
