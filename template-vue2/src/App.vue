<template>
  <div id="app">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      msg: 'hello',
    }
  },
}
</script>

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
