<template>
  <header class="header">
    <router-link class="router-link" to="/">Go to Home</router-link>
    <router-link class="router-link" to="/about">Go to About</router-link>
  </header>
  <main class="main beauty-scroller">
    <router-view />
  </main>
</template>

<style>
  #app {
    font-size: var(--font-size-body);
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
      h1 {
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          font-size: 20px;
          width: 100px;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
  }
</style>
