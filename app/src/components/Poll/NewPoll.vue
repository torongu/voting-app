<template>
  <div id="newPoll">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">
          <h1>New Poll</h1>
          <p v-show="error.message" class="alert-danger">{{ error.message }}</p>
          <p v-show="success.message" class="alert-success">{{ success.message }}</p>
          <form @submit.prevent="onCreatePoll(poll)">
            <div class="form-group">
              <label>Name your poll:</label>
              <input type="text" v-model="poll.question" class="form-control" placeholder="Name your poll???"/>
            </div>
            <div class="form-group">
              <label>Options:</label>
              <div v-for="(item, index) in poll.answers" :key="index" class="poll-option">
                <input type="text"
                  v-model="item.answer"
                  class="form-control"
                  placeholder="Your options"
                />
                <span v-if="index > 1" id="btnRemoveOption"
                  class="glyphicon glyphicon-remove-circle pull-right"
                  @click="removeOption(index)">
                </span>
              </div>
            </div>
            <button type="button" class="btn btn-default pull-left" @click="newOption">More Options</button>
            <button type="submit" id="btnNewPoll" class="btn btn-primary pull-left">Submit</button>
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
    poll: {
      question: "",
      answers: [
        { answer: "" },
        { answer: "" }
      ]
    },
    success: {
      message: ""
    },
    error: {
      message: ""
    }
  }),
  methods: {
    onCreatePoll(poll) {
      http.post('/poll', poll)
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            console.log(data);
            this.success.message = data.message;
            this.error.message = "";
            setTimeout(() => {
              this.success.message = "";
              this.$router.push(`/poll/${data.results._id}`);
            }, 2000);
          } else {
            this.success.message = "";
            this.error.message = data.message;
            setTimeout(() => {
              this.error.message = "";
            }, 2000);
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
        });
    },
    newOption() {
      this.poll.answers.push({ answer: "" });
    },
    removeOption(id) {
      return this.poll.answers = this.poll.answers.filter((item, index) => {
        return index !== id;
      });
    }
  }
}
</script>

<style scoped>
.poll-option {
  position: relative;
  margin-top: 5px;
}
#btnNewPoll {
  margin-left: 15px;
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

#btnRemoveOption {
  position: absolute;
  cursor: pointer;
  color: #ff2b2b;
  font-size: 1.2em;
  z-index: 5;
  top: 10px;
  right: 10px;
}
</style>
