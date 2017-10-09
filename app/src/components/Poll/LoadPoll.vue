<template>
  <div id="pollDetail">
    <div class="container">
      <div v-show="poll.question" class="row">
        <div id="poll" class="col-md-6">
          <h2>{{ poll.question }}</h2>
          <p>by {{ user.name }}</p>
          <div class="col-md-8 col-md-offset-2">
            <div class="list-group poll-options">
              <div class="list-group-item"
                v-for="(item, index) in poll.answers" :key="index"
              >
                <input type="radio" name="options" :value="item._id" v-model="vote_id"/> <span>{{ item.answer }}</span>
              </div>
            </div>
            <button type="button" id="btnVote" class="btn btn-info pull-left" v-show="!isLogin" @click="vote">Vote!</button>
          </div>
        </div>

        <div class="col-md-6">
          <canvas id="pollChart" ref="pollChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../../utils/http'
import auth from '../../utils/auth'
import Chart from 'chart.js'

export default {
  data: () => ({
    poll: {},
    user: {},
    answers: [],
    vote_id: "",
    isLogin: auth.isAuthenticated()
  }),
  methods: {
    vote() {
      let route = `/poll/${this.poll._id}/vote/${this.vote_id}`;
      http.put(route, {})
        .then(response => response.data)
        .then(data => {
          this.answers = data.results.answers;
          this.chart(this.answers);
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
    chart(answers) {
      let ctx = this.$refs.pollChart.getContext('2d');
      let labels = answers.map(item => {
        return item.answer;
      });
      let data = answers.map(item => {
        return item.vote;
      });
      let myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            	'#CD5C5C',
              '#20B2AA',
              '#87CEFA',
              '#48D1CC',
              '#800080',
              '#663399',
              '#6A5ACD'
            ]
          }],
          labels: labels
        }
      });
    }
  },
  created() {
    let route = `/poll/${this.$route.params.poll_id}`;
    http.get(route)
      .then(response => response.data)
      .then(data => {
        this.user = data.results.user_id;
        this.poll = data.results;
        this.answers = data.results.answers;
        if (this.isLogin) {
          this.chart(this.answers);
        }
      })
      .catch(err => console.log(err.response));
  }
}
</script>

<style scoped>
h2 {
  margin-bottom: 0;
}

p {
  color: #9e9e9e;
}

#poll {
  margin-top: 50px;
}

.poll-options {
  text-align: left;
}

#btnVote {
  padding: 6px 50px;
  font-size: 16px;
  outline: none;
}

input[type='radio'] {
  width: 16px;
  height: 16px;
}

.poll-options span {
  position: relative;
  top: -3px;
}

#pollChart {
  margin-top: 60px;
}
</style>
