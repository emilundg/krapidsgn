import Vue from 'vue';
import Router from 'vue-router';

import Main from '../components/Main.vue';

Vue.use(Router);

let router = new Router({
  routes: [{
      path: '*',
      redirect: '/main'
    },
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
});

export default router;