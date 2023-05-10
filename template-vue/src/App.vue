<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="h-15 mt-10 flex items-center justify-center">
    <router-link class="mr-5 text-xl font-semibold" :class="route.path === '/home' && 'text-emerald-300'" to="/home">
      Go to Home
    </router-link>
    <router-link class="text-xl font-semibold" :class="route.path === '/about' && 'text-emerald-300'" to="/about">
      Go to About
    </router-link>
  </header>
  <main class="main beauty-scroller">
    <router-view />
  </main>
</template>

<style>
#app {
  @apply h-full text-sm leading-6 text-neutral-600;
}
</style>
