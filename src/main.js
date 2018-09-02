import Vue from 'vue';
import BootstrapVue from "bootstrap-vue";
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueFirestore from 'vue-firestore';
import firebase from 'firebase/app';
import router from './router';

Vue.use(VueFirestore);

Vue.use(BootstrapVue);


Vue.config.productionTip = false;

var app;
var config = {
  apiKey: "AIzaSyCtCfmtjXLNZcjg9qVV5NIlg1zd8tJA6X8",
  authDomain: "control-7c173.firebaseapp.com",
  databaseURL: "https://control-7c173.firebaseio.com",
  projectId: "control-7c173",
  storageBucket: "control-7c173.appspot.com",
  messagingSenderId: "557946171881"
};
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: {
        App
      },
      router
    })
  }
});