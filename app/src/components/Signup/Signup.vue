<template>
  <div id="signupPage">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <h1 class="text-header">Sign Up</h1>
          <p v-show="error.message" class="alert-danger">{{ error.message }}</p>
          <p v-show="success.message" class="alert-success">{{ success.message }}</p>
          <form @submit.prevent="onSignup(user)">
            <div class="form-group" :class="{'has-error': error.name}">
              <label>Name:</label>
              <input type="text" v-model="user.name" class="form-control" placeholder="Enter your email" @blur="checkName"/>
            </div>
            <div class="form-group" :class="{'has-error': error.email}">
              <label>Email:</label>
              <input type="email" v-model="user.email" class="form-control" placeholder="Enter your email" @blur="checkEmail"/>
            </div>
            <div class="form-group" :class="{'has-error': error.password}">
              <label>Password:</label>
              <input type="password" v-model="user.password" class="form-control" placeholder="Enter your password" @blur="checkPass"/>
            </div>
            <div class="form-group" :class="{'has-error': error.password2}">
              <label>Confirm Password:</label>
              <input type="password" v-model="user.password2" class="form-control" placeholder="Enter your password" @blur="checkPass2"/>
            </div>

            <button type="submit" id="btnSignup" class="btn btn-default pull-left">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../utils/http';

export default {
  data: () => ({
    user: {
      name: "",
      email: "",
      password: "",
      password2: ""
    },
    success: {
      message: ''
    },
    error: {
      message: '',
      name: false,
      email: false,
      password: false,
      password2: false
    }
  }),
  methods: {
    onSignup(user) {
      if (this.isValidForm()) {
        http.post("/user/signup", user)
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
              }.bind(this), 2000)
            }
          })
          .catch(err => console.log(err));
      }
    },
    checkName() {
      if (!this.user.name) {
        this.error.name = true;
      } else {
        this.error.name = false;
      }
    },
    checkEmail() {
      let testReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.user.email) {
        this.error.email = true
      } else {
        this.error.email = !testReg.test(this.user.email);
      }
    },
    checkPass() {
      if (!this.user.password) {
        this.error.password = true;
      } else {
        this.error.password = false;
      }
    },
    checkPass2() {
      if (this.user.password !== this.user.password2) {
        this.error.password2 = true;
      } else {
        this.error.password2 = false;
      }
    },
    isValidForm() {
      let err = this.error;
      if (err.email || err.name || err.password || err.password2 ) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style scoped>
.form-group label {
  width: 100%;
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

#btnSignup {
  background: #5cb85c;
  border-color: #4cae4c;
  color: #ffffff;
  padding: 6px 50px;
  margin-top: 15px;
}

#btnSignup:hover {
  background: #4aa84c;
}
</style>
