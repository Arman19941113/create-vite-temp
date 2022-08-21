<script lang="ts" setup>
import store from '@/store'
</script>

<template>
  <h1>About</h1>
  <h1>
    <span>counts: {{ store.state.count }}</span>
    <button @click="store.commit('increment', 2)">
      Add 2
    </button>
  </h1>
</template>
