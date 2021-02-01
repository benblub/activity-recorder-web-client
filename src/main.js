import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import DatePicker from 'v-calendar/lib/components/date-picker.umd';
import { BPagination } from "bootstrap-vue";
import 'bootstrap-icons/font/bootstrap-icons.css';

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
  render: h => h(App)
}).$mount('#app')
