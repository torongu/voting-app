<template>
  <div class="header">
    <div class="jumbotron">
      <div v-show="!isLogin">
        <h1 class="text-header">VotePlex</h1>
        <p>Create custom polls with live results.</p>
      </div>
      <div v-show="isLogin">
        <h1 class="text-header">Dashboard</h1>
        <p>What would you like to do today?</p>
      </div>
      <router-link to="/signup" v-show="!isLogin"><button id="btnSignup" class="btn btn-primary">Signup</button></router-link>
      <router-link to="/" v-show="isLogin"><button class="btn btn-success">New Poll</button></router-link>
      <router-link to="/mypolls" v-show="isLogin"><button class="btn btn-info">My Polls</button></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isLogin"],
  data: () => ({})
}
</script>

<style scoped>
.header .jumbotron {
  width: 100%;
  margin: 0;
  border-radius: 0;
  background: #4393B9;
  color: #f2f2f2;
}

#btnSignup {
  background: #47a447;
  padding: 8px 56px;
  font-size: 16px;
  outline: none;
  border-color: #398439;
}

.btn {
  outline: none;
}

#btnSignup:hover {
  background: #4aa84c;
}

#btnSignup a {
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}
</style>
