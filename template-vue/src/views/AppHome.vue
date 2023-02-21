<script lang="ts" setup>
import { useCounterStore } from '@/store'

const store = useCounterStore()

store.$subscribe((mutation, state) => {
  // same as store.$id
  console.log('mutation.storeId', mutation.storeId) // 'counter'
  // import { MutationType } from 'pinia'
  console.log('mutation.type', mutation.type) // 'direct' | 'patch object' | 'patch function'
  // only available with mutation.type === 'patch object'
  if (mutation.type === 'patch object') {
    console.log('mutation.payload', mutation.payload) // patch object passed to cartStore.$patch()
  }

  console.log('state', JSON.parse(JSON.stringify(state)))
})
</script>

<template>
  <div>Home</div>
  <div>count: {{ store.count }}</div>
  <div>doubleCount: {{ store.doubleCount }}</div>
  <div>
    <button @click="store.increment(1)">
      Add 1
    </button>
    <button @click="store.$patch({ count: 999 })">
      Set 999
    </button>
  </div>
</template>
