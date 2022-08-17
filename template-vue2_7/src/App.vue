<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('hello')
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style>
  @import "@/styles/mixins.css";

  #app {
    height: 100%;
    overflow: auto;
    @mixin scrollbar-mixin;
    font-size: var(--font-size-body);
    h1 {
      text-align: center;
    }
  }
</style>
