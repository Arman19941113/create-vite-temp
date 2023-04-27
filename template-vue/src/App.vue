<template>
  <header class="header">
    <router-link class="router-link" to="/home">Go to Home</router-link>
    <router-link class="router-link" to="/about">Go to About</router-link>
  </header>
  <main class="main beauty-scroller">
    <router-view />
  </main>
</template>

<style>
#app {
  overflow: auto;
  height: 100%;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;

    .router-link {
      font-size: 20px;
      font-weight: 600;

      &:not(:last-child) {
        margin-right: 20px;
      }

      &.router-link-active {
        color: lightgreen;
      }
    }
  }

  .main {
    overflow: auto;
    height: calc(100% - 60px);

    div {
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
