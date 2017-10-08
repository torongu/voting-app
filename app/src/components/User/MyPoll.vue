<template>
  <div id="myPoll">
    <div class="container-fluid">
      <div class="row">
        <div id="listPoll" class="col-md-6 col-md-offset-3">
          <div class="list-group">
            <div class="list-group-item active"><h1><strong>Your Polls</strong></h1></div>
            <div
              class="list-group-item"
              v-for="(poll, index) in polls"
              :key="index"
            >
              <router-link to="/">{{ poll.question }}</router-link>
              <span id="btnDeletePoll" class="glyphicon glyphicon-remove-circle pull-right" @click="onDeletePoll(index)"></span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    polls: [
      {
        question: "Which came first the chicken or the egg???",
        answers: [{
          answer: "The chicken"
        }, {
          answer: "The egg"
        }]
      },
      {
        question: "Who is your favorite captain???",
        answers: [{
          answer: "Ngoc"
        }, {
          answer: "Truong"
        }]
      }
    ]
  }),
  methods: {
    onDeletePoll(id) {
      return this.polls = this.polls.filter((poll, index) => {
        return index !== id;
      })
    }
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
</style>
