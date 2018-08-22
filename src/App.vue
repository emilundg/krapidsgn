<template>
  <div id="app">
    <div>
      <b-navbar class="b-navbar" toggleable="md" type="dark" variant="dark">

        <b-navbar-brand href="#">NoFuzz</b-navbar-brand>

        <b-navbar-toggle style="border-radius: 0px; border-top: 0px; border-bottom: 0px;" target="nav_collapse"></b-navbar-toggle>
        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="button" v-bind:active="tab === 1" v-on:click="tab = 1" href="#">Add Incident</b-nav-item>
            <b-nav-item class="button" @click="doShiet()" v-bind:active="tab === 2" v-on:click="tab = 2" href="#">Overview</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <div class="row" style="justify-content: center;">
        <b-card v-if="tab === 2" tag="article" class="col-xs-10 col-sm-10 col-md-6 mb-4">
          <h2>Incidents</h2>
          <line-chart :chartData="chartData"></line-chart>
        </b-card>

        <b-card v-if="tab === 2" tag="article" class="col-xs-10 col-sm-10 col-md-4 mb-4" id="data" style="">
          <h2>Data</h2>
           <div class="row" style="margin-top: 30px; justify-content: center;">
              <div class="col-4 col-sm-4 col-md-3 col-l-4 outcomes neu">
                <p class="header">Total:</p>
                <p class="content"> {{ posOut + negOut }} </p>
              <div class="bord"></div>
              </div>
              <div class="col-4 col-sm-4 col-md-3 col-l-4 outcomes pos">
                <p class="header">Pos:</p>
                <p class="content"> {{ posOut }} </p>
                <div class="bord"></div>
              </div>
              <div class="col-4 col-sm-4 col-md-3 col-l-4 outcomes neg">
                <p class="header">Neg:</p>
                <p class="content"> {{ negOut }} </p>
                <div class="bord"></div>
              </div>
            </div>
          <table class="table">
            <tbody>
              <tr>
                <td><b>Date:</b></td>
                <td id="dateData">-</td>
              </tr>
              <tr>
                <td><b>Intensity:</b></td>
                <td id="intensityData">-</td>
              </tr>
              <tr>
                <td><b>Situation:</b></td>
                <td id="situationData">-</td>
              </tr>
            <tr>
                <td><b>Result:</b></td>
                <td id="resultData">-</td>
              </tr>
              <tr>
                <td><b>Consequence:</b></td>
                <td id="consequenceData">-</td>
              </tr>
            </tbody>
          </table>
        </b-card>
      </div>
    </div>

    <b-container class="container-fluid" v-if="tab === 1" fluid>
      <b-card v-if="tab === 1" tag="article" class="mb-5" style="margin: 30px auto;">
        <h2>Add Incident</h2>
        <b-form id="app" class="row" @submit="onSubmit">
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div class="inputfield">
              <label for="comment">Intensity:</label>
              <b-form-input v-model="intensity" type="text" placeholder="Enter intensity" required></b-form-input>
            </div>

            <div class="inputfield">

              <label for="comment">Date:</label>
              <datepicker v-model="date" placeholder="Enter date" class="form-control" :format="customFormatter" required></datepicker>
            </div>

            <div class="inputfield">
              <label for="comment">Situation:</label>
              <b-form-input v-model="situation" type="text" placeholder="Enter situation" required></b-form-input>
            </div>

          </div>
          <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">

            <div class="inputfield">
              <label for="comment">Result:</label>
              <b-form-input v-model="result" type="text" placeholder="Enter result" required></b-form-input>
            </div>

            <div class="inputfield">
              <label for="comment">Consequence:</label>
              <b-form-input v-model="consequence" type="text" placeholder="Enter consequence" required></b-form-input>
            </div>

            <div class="inputfield">
              <label for="comment">Outcome:</label>
              <b-form-select v-model="selected" :options="options" class="mb-3" required/>
            </div>
          </div>


          <button type="submit" class="submit">
                                  Submit
                                </button>

        </b-form>
      </b-card>
      <dot-loader :loading="loading" :color="color"></dot-loader>
    </b-container>
  </div>
</template>

<script>
  import Firebase from 'firebase/app'
  import 'firebase/firestore'
  import DotLoader from 'vue-spinner/src/DotLoader.vue'
  import LineChart from './LineChart.js'
  import Moment from 'moment'
  import Datepicker from 'vuejs-datepicker';

  var config = {
    apiKey: "AIzaSyCtCfmtjXLNZcjg9qVV5NIlg1zd8tJA6X8",
    authDomain: "control-7c173.firebaseapp.com",
    databaseURL: "https://control-7c173.firebaseio.com",
    projectId: "control-7c173",
    storageBucket: "control-7c173.appspot.com",
    messagingSenderId: "557946171881"
  };

  export default {
    name: 'app',
    components: {
      'LineChart': LineChart,
      'DotLoader': DotLoader,
      'Datepicker': Datepicker
    },
    data() {
      return {
        selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: true, text: 'Positive' },
          { value: false, text: 'Negative' },
        ],
        color: "rgba(33, 147, 245, 0.5)",
        errors: [],
        loading: false,
        sliding: null,
        incidents: [],
        chartData: [],
        posOut: 0,
        negOut: 0,
        tab: 1,
        date: '',
        intensity: '',
        situation: '',
        result: '',
        consequence: '',
        datacollection: null
      }
    },
    created() {
      if (!Firebase.apps.length) {
        Firebase.initializeApp(config)
      }

      Firebase.firestore().settings({
        timestampsInSnapshots: true
      });

      this.$binding("incidents", Firebase.firestore().collection("incidents").orderBy("date"))
        .then((incidents) => {
          this.incidents = incidents
        })
    },
    methods: {
      customFormatter(date) {
        return Moment(date).format('h:mm a DD MMMM YYYY');
      },
      doShiet() {
        var chartData = []
        var pointBg = []
        var self = this
        self.posOut = 0
        self.negOut = 0
        this.incidents.forEach(function(el) {
          var obj = {};
          obj.t = Moment(new Date(el.date.seconds * 1000),"H:mm DD MMMM YYYY")
          obj.y = el.intensity;
          obj.situation = el.situation;
          obj.result = el.result;
          obj.consequence = el.consequence;

          if (el.pos) {
            pointBg.push('rgba(38, 207, 91, 0.6)')
            self.posOut+=1
          } else if (!el.pos) {
            pointBg.push('rgba(245, 45, 83, 0.6)')
            self.negOut+=1
          }
          chartData.push(obj);
        })

        var first = chartData[0].t;
        var last = chartData[chartData.length - 1].t;

        var data = {
          labels: [first, last],
          datasets: [{
            radius: 6,
           cubicInterpolationMode: 'monotone',
            pointBackgroundColor: pointBg,
            backgroundColor: 'rgba(45,183,245, 0.15)',
            borderColor: 'rgba(45,183,245, 0.56)',
            label: 'All',
            data: chartData
          }
         ]
        }
        this.chartData = data;
      },
      onSubmit(e) {
        this.loading = true;
        // Add a new document with a generated id.
        e.preventDefault();
        const collectionRef = Firebase.firestore().collection("incidents");
        collectionRef
          .add({
            intensity: this.intensity,
            date: this.date,
            situation: this.situation,
            result: this.result,
            consequence: this.consequence,
            pos: this.selected
          })
          .then(function() {
            window
              .location
              .reload();
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
    }
  }
</script>

<style lang="scss">
  .v-spinner {
    position: absolute;
    top: 50vh;
    left: 47.5vw;
  }

  .submit {
    display: block;
    margin: 30px auto;
    height: 38px;
    padding: 0 30px;
    line-height: 38px;
    text-transform: uppercase;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #bbb;
    cursor: pointer;
    letter-spacing: 0.1rem;
    transition: all ease-in 0.2s;
    color: rgba(0, 0, 0, 0.87);
    outline: none;
    &:focus {
      outline: none;
    }
    &:hover {
      border-color: rgb(134, 134, 134);
    }
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .vdp-datepicker {
    input {
    width: 100%;
      color: rgba(0, 0, 0, 0.87);
      border: none;
  }
  }

  .card {
    border: none;
    border-radius: 0px;
    margin: 4vh;
    padding: 0px;
    width: 85vw;
    min-height: 80vh;
    box-shadow: 0 3px 8px 0 rgba(68, 45, 45, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
    h2 {
      margin-bottom: 20px;
    }
  }

  h1,
  h2 {
    font-weight: normal;
  }

  .table {
    text-align: left;
    td {
      padding: 7px;
      border: none;
    }
  }

  .inputfield,
  .form-group {
    text-align: left;
    margin-bottom: 30px;
  }

.outcomes {
  font-weight:400;
  margin-bottom: 30px;
  .bord {
    margin: 0 auto;
    max-width: 60px;
    border: 2px solid transparent;
  }
  &.neu {
    &:hover {
      p {
        color: rgba(45,183,245, 0.8);
      }
      .bord {
        border: 1.5px solid rgba(45,183,245, 0.8);
      }
    }
  }
  &.neg {
    &:hover {
      p {
        color: rgba(245, 45, 83, 0.7);
      }
      .bord {
        border: 1.5px solid rgba(245, 45, 83, 0.7);
      }
    }
  }
  &.pos{
    &:hover {
      p {
        color: rgba(38, 207, 91, 0.7);
      }
      .bord {
        border: 1.5px solid rgba(38, 207, 91, 0.7);
      }
    }
  }
  .header {
    color: rgba(0, 0, 0, 0.56);
    margin: 0px;
    font-size: 14px;
  }
  .content {
    font-size: 18px;
    color: rgba(0,0,0,0.87);
    margin-bottom: 6px;
  }
}
</style>
