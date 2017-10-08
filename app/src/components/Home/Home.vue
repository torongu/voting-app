<template>
  <div id="homePage" class="container-fluid">
    <app-header :isLogin="isLogin"></app-header>
    <app-content></app-content>
    <app-footer></app-footer>
  </div>
</template>
<script>
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

export default {
  props: ["isLogin"],
  data: () => ({}),
  components: {
    'app-header': Header,
    'app-content': Content,
    'app-footer': Footer
  }
}
</script>
<style scoped>
#homePage {
  padding: 0;
}
</style>
