import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuesax)
Vue.config.productionTip = false
Vue.use(require('vue-moment'));
new Vue({
  render: h => h(App),
}).$mount('#app')
