import Vue from 'vue';
import Dev from './serve.vue';
import './tailwind.css';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
