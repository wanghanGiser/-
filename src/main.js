import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
let store=Vue.observable({
  rangeCount:10
})
Vue.prototype.$store=store;
new Vue({
  render: h => h(App),
}).$mount('#app')