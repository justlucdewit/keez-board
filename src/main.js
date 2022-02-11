import Vue from 'vue'
import App from './App.vue'

window.sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')
