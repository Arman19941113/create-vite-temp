<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('hello')
</script>

<template>
  <div class="text-center">{{ msg }}</div>
</template>

<style>
#app {
  @apply h-full text-sm leading-6 text-neutral-600;
}
</style>
