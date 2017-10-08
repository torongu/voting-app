<template>
  <div class="base-template">
    <nav-bar :isLogin="isLogin" :user="user" @logout="handleAuth"></nav-bar>
    <router-view @login="handleAuth"></router-view>
  </div>
</template>

<script>
import Navbar from './Navbar'
import auth from '../../utils/auth'

/*
* All state will be control in here.
* This application didn't use vuex
*/
export default {
  name: 'base',
  data () {
    return {
      isLogin: auth.isAuthenticated(),
      user: JSON.parse(localStorage.getItem("user"))
    }
  },
  components: {
    'nav-bar': Navbar
  },
  methods: {
    handleAuth(data) {
      this.isLogin = data.isLogin;
      if (data.user) {
        this.user = data.user;
      }
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
