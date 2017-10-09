<template>
  <div id="myPoll">
    <div class="container-fluid">
      <div class="row">
        <div id="listPoll" class="col-md-6 col-md-offset-3">
          <p v-show="res.message" :class="{'alert-success': res.success, 'alert-danger': !res.success}">{{ res.message }}</p>
          <div class="list-group">
            <div class="list-group-item active"><h1><strong>Your Polls</strong></h1></div>
            <div class="list-group-item"
              v-for="(poll, index) in polls"
              :key="index"
            >
              <router-link :to="'/poll/' + poll._id">{{ poll.question }}</router-link>
              <span id="btnDeletePoll" class="glyphicon glyphicon-remove-circle pull-right" @click="onDeletePoll(poll._id)"></span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../utils/http'

export default {
  data: () => ({
    polls: [],
    res: {
      success: null,
      message: ''
    }
  }),
  methods: {
    onDeletePoll(id) {
      http.delete("/poll/"+id, {})
        .then(response => response.data)
        .then(data => {
          console.log(data);
          this.res = data;
          if (data.success) {
            http.get("/poll")
              .then(response => response.data)
              .then(data => {
                this.polls = data.results;
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
              });
          }

          setTimeout(function() {
            this.res.success = null;
            this.res.message = "";
          }.bind(this), 2000)
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
        });
    }
  },
  created() {
    console.log(http);
    http.get("/poll")
      .then(response => response.data)
      .then(data => {
        this.polls = data.results;
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
      });
  }
}
</script>

<style scoped>
#myPoll {
  margin-top: 50px;
}

#listPoll a {
  cursor: pointer;
}

#btnVote {
  padding: 6px 60px;
  font-size: 16px;
}

#btnDeletePoll {
  cursor: pointer;
  margin-top: 2px;
  color: #ff2b2b;
  font-size: 1.2em;
  z-index: 5;
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
