import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)

  function increment(val = 1) {
    count.value += val
  }

  return {
    count,
    doubleCount,
    increment,
  }
})
