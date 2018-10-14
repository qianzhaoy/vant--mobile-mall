import Vue from 'vue';
import App from './App.vue';
import router from './vue/router';
import './assets/scss/global.scss';

import Vuelidation from '@/vue/plugins/vuelidation';
import valid from '@/vue/mixin/valid';
import VueCountdown from '@/vue/plugins/vue-countdown';

import axios from '@/vue/plugins/axios';
import filters from '@/vue/filter';

Vue.use(VueCountdown);
Vue.use(axios);
Vue.use(Vuelidation);
Vue.use(valid);
Vue.use(filters);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
