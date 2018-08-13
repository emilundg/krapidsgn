import Vue from 'vue';
import BootstrapVue from "bootstrap-vue";
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import VueFirestore from 'vue-firestore';
import Vue2TouchEvents from 'vue2-touch-events';

Vue.use(Vue2TouchEvents);

Vue.use(VueFirestore);

Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  render: h => h(App)
});