import Vue from 'vue';
import App from './App.vue';
import router from './vue/router';
import './assets/scss/global.scss';
import '@/assets/scss/iconfont/iconfont.css';

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

import { Lazyload, Icon, Cell, CellGroup, loading, Button } from 'vant';
Vue.use(Icon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(loading);
Vue.use(Button);
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: require('@/assets/images/goods_default.png'),
  loading: require('@/assets/images/goods_default.png'),
  attempt: 1,
  listenEvents: ['scroll'],
  lazyComponent: true
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
