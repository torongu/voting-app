<template>
  <div id="changePassword">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <h1 class="text-header">Change Password</h1>
          <p v-show="res.message" :class="{'alert-success': res.success, 'alert-danger': !res.success}">{{ res.message }}</p>
          <form @submit.prevent="onChangePassword(user)">
            <div class="form-group">
              <label>Password:</label>
              <input type="password" v-model="user.password" class="form-control" placeholder="Enter your password"/>
            </div>
            <div class="form-group">
              <label>Confirm Password:</label>
              <input type="password" v-model="user.password2" class="form-control" placeholder="Confirm your password"/>
            </div>
            <button type="submit" id="btnLogin" class="btn btn-success pull-left">Change password</button>
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
      password: "",
      password2: ""
    },
    res: {
      success: null,
      message: ""
    }
  }),
  methods: {
    onChangePassword(data) {
      http.put('/user/changepassword', data)
        .then(response => response.data)
        .then(data => {
          this.res = data;

          if (data.success) {
            setTimeout(function() {
              localStorage.clear();
              this.$emit("logout", {
                isLogin: false
              });
              this.$router.push("/login");
            }.bind(this), 1000);
          } else {
            setTimeout(function() {
              this.res.success = null;
              this.res.message = "";
            }.bind(this), 2000);
          }

        })
        .catch(err => {
          if (err.response.status === 403) {
            localStorage.clear();
            this.$emit("logout", {
              isLogin: false
            });
            this.$router.push("/");
          } else {
            console.log(err.response);
          }
        })
    }
  }
}
</script>

<style scoped>
.form-group {
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
</style>
