<template>
  <div id="app">
    <base-template></base-template>
  </div>
</template>

<script>
import Base from './components/Main/Base'

export default {
  name: 'app',
  components: {
    "base-template": Base
  }
}
</script>

<style>
#app {
  font-family: 'Helvetica', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
