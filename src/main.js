import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";
import setAuthHeader from './utils/HeaderAuth';

if(localStorage.jwtToken){
  setAuthHeader(localStorage.jwtToken);
}else{
  setAuthHeader(false);
}

axios.defaults.baseURL = 'https://8080-moccasin-quelea-0pyqbkgv.ws-us21.gitpod.io/calculo_do_Km/';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


