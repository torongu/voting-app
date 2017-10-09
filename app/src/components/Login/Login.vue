<template>
  <div id="loginPage">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <h1 class="text-header">Login</h1>
          <p v-show="error.message" class="alert-danger">{{ error.message }}</p>
          <p v-show="success.message" class="alert-success">{{ success.message }}</p>
          <form @submit.prevent="onLogin(user)">
            <div class="form-group" :class="{'has-error': error.email}">
              <label>Email:</label>
              <input type="email" v-model="user.email" class="form-control" placeholder="Enter your email" @blur="checkEmail"/>
            </div>
            <div class="form-group" :class="{'has-error': error.password}">
              <label>Password:</label>
              <input type="password" v-model="user.password" class="form-control" placeholder="Enter your password" @blur="checkPass"/>
            </div>
            <button type="submit" id="btnLogin" class="btn btn-default pull-left">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../utils/http'

export default {
  data: () => ({
    user: {
      email: '',
      password: ''
    },
    success: {
      message: ''
    },
    error: {
      message: '',
      email: false,
      password: false
    }
  }),
  methods: {
    onLogin(user) {
      if (!this.error.email && !this.error.password) {
        http.post('/user/authenticate', user)
          .then(response => response.data)
          .then(data => {
            if (data.success) {
              localStorage.setItem("id_token", data.token);
              localStorage.setItem("user", JSON.stringify(data.user));
              this.$emit("login", {
                isLogin: true,
                user: data.user
              });
              this.error.message = "";
              this.success.message = data.message;
              setTimeout(function() {
                this.success.message = '';
                this.$router.push('/');
              }.bind(this), 1000);
            } else {
              this.error.message = data.message;
              setTimeout(function() {
                this.error.message = '';
              }.bind(this), 2000);
            }
          })
          .catch(err => console.log(err));
      }
    },
    checkPass() {
      if (!this.user.password) {
        this.error.password = true;
      } else {
        this.error.password = false;
      }
    },
    checkEmail() {
      let testReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.user.email) {
        this.error.email = true;
      } else {
        this.error.email = !testReg.test(this.user.email);
      }
    }
  }
}

</script>

<style scoped>
.form-group label {
  display: block;
  text-align: left;
}

.alert-danger, .alert-success {
  padding: 4px 0;
  border-radius: 4px;
  animation-name: fade-alert;
  animation-duration: 3s;
}

@keyframes fade-alert {
  100% {
    background: rgba(0, 0, 0, 0);
    color: rgba(0, 0, 0, 0);
  }
}

#btnLogin {
  background: #5cb85c;
  border-color: #4cae4c;
  color: #ffffff;
  padding: 6px 50px;
  margin-top: 15px;
}

#btnLogin:hover {
  background: #4aa84c;
}
</style>
