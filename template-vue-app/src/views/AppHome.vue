<script lang="ts" setup>
import store from '@/store'
</script>

<template>
  <h1>Home</h1>
  <h1>
    <span>counts: {{ store.state.count }}</span>
    <button @click="store.commit('increment', 1)">
      Add 1
    </button>
  </h1>
</template>
