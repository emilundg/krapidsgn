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
      <b-card v-if="tab === 2" tag="article" class="mb-5">
        <h2>Incidents</h2>
        <line-chart :chartData="chartData"></line-chart>
      </b-card>

      <b-card v-if="tab === 2" tag="article" class="mb-5" id="data" style="display: none; justify-content: center;">
        <h2>Data</h2>
        <table class="table">
          <tbody>
            <tr>
              <td><b>Intensity:</b></td>
              <td id="intensityData"></td>
            </tr>
            <tr>
              <td><b>Date:</b></td>
              <td id="dateData"></td>
            </tr>
            <tr>
              <td><b>Situation:</b></td>
              <td id="situationData"></td>
            </tr>
           <tr>
              <td><b>Result:</b></td>
              <td id="resultData"></td>
            </tr>
            <tr>
              <td><b>Consequence:</b></td>
              <td id="consequenceData"></td>
            </tr>
          </tbody>
        </table>
      </b-card>
    </div>

    <b-container class="container-fluid" v-if="tab === 1" fluid>
      <b-card v-if="tab === 1" tag="article" class="mb-5">
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
        this.incidents.forEach(function(el) {
          var obj = {};
          obj.t = Moment.unix(el.date.seconds).format("h:mm a DD MMMM YYYY");
          obj.y = el.intensity;
          obj.situation = el.situation;
          obj.result = el.result;
          obj.consequence = el.consequence;

          if (el.pos) {
            pointBg.push('rgba(45, 245, 107, 0.8)')
          } else if (!el.pos) {
            pointBg.push('rgba(245, 45, 83, 0.8)')
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
            backgroundColor: 'rgba(45,183,245, 0.2)',
            borderColor: 'rgba(45,183,245, 0.8)',
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
    margin: 5vh;
    box-shadow: 0 3px 8px 0 rgba(68, 45, 45, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.08);
    width: 85vw;
    margin: 30px auto;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  .table {
    text-align: left;
    td {
      border: none;
    }
  }

  .inputfield,
  .form-group {
    text-align: left;
    margin-bottom: 30px;
  }
</style>
