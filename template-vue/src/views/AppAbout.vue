<script lang="ts" setup>
import { useCounterStore } from '@/store'

const store = useCounterStore()
</script>

<template>
  <div>About</div>
  <div>count: {{ store.count }}</div>
  <div>doubleCount: {{ store.doubleCount }}</div>
  <div>
    <button @click="store.increment(2)">
      Add 2
    </button>
  </div>
</template>
