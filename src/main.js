import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { BPagination } from "bootstrap-vue";
import 'bootstrap-icons/font/bootstrap-icons.css';
import store from "./store";
import Axios from "axios";

Vue.prototype.$http = Axios
Vue.prototype.$http.defaults.baseURL = 'http://localhost:8000'

const token  = localStorage.getItem('apitoken')

if (token) {
  Vue.prototype.$http.defaults.headers.common['X-AUTH-TOKEN'] = token
}


Vue.config.productionTip = false

Vue.component('b-pagination', BPagination);
Vue.component('date-picker', DatePicker)

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM.DD.YYYY')
  }
})

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
