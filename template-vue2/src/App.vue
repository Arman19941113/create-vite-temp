<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('hello')
</script>

<template>
  <h1 style="text-align: center;">{{ msg }}</h1>
</template>

<style>
  #app {
    height: 100%;
    overflow: auto;
  }
</style>
