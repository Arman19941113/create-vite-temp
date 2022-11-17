<script lang="ts" setup>
import { useCounterStore } from '@/store'

const store = useCounterStore()
</script>

<template>
  <h1>About</h1>
  <h1>count: {{ store.count }}</h1>
  <h1>doubleCount: {{ store.doubleCount }}</h1>
  <h1>
    <button @click="store.increment( 2)">Add 2</button>
  </h1>
</template>
