<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <div class="navbar-brand">VotePlex</div>
        <ul class="nav navbar-nav navbar-left">
          <li :class="{'router-link-active': $route.fullPath === '/'}"><router-link to="/" exact>Home</router-link></li>
        </ul>
      </div>

      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <!-- if not login -->
        <ul v-if="!isLogin" class="nav navbar-nav navbar-right">
          <li :class="{'router-link-active': $route.fullPath === '/login'}">
            <router-link to="/login">Login</router-link>
          </li>
          <li :class="{'router-link-active': $route.fullPath === '/signup'}">
            <router-link to="/signup">Signup</router-link>
          </li>
        </ul>
        <!-- if logged in -->
        <ul v-if="isLogin" class="nav navbar-nav navbar-right">
          <li><a style="color: #ffffff;">Hello, {{ user.name.split(' ').shift() }}!</a></li>
          <li><router-link to="/changepass"><span class="glyphicon glyphicon-cog"></span></router-link></li>
          <li @click="onLogout"><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["isLogin", "user"],
  data: () => ({}),
  methods: {
    onLogout() {
      localStorage.clear();
      this.$emit("logout", {
        isLogin: false
      });
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
.navbar {
  border-radius: 0;
  margin: 0;
}

.navbar-brand {
  cursor: default;
}

.router-link-active {
  background: #000000;
}
</style>
