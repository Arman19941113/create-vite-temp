<script lang="ts" setup>
import { useCounterStore } from '@/store'

const store = useCounterStore()
store.$subscribe((mutation, state) => {
  // same as store.$id
  console.log(mutation.storeId) // 'cart'
  // import { MutationType } from 'pinia'
  console.log(mutation.type) // 'direct' | 'patch object' | 'patch function'
  // only available with mutation.type === 'patch object'
  if (mutation.type === 'patch object') {
    console.log(mutation.payload) // patch object passed to cartStore.$patch()
  }

  console.log(JSON.parse(JSON.stringify(state)))
})

const increment = () => store.increment(1)
const set999 = () => store.$patch({ count: 999 })
</script>

<template>
  <h1>Home</h1>
  <h1>count: {{ store.count }}</h1>
  <h1>doubleCount: {{ store.doubleCount }}</h1>
  <h1>
    <button @click="increment">Add 1</button>
    <button @click="set999">Set 999</button>
  </h1>
</template>
