import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入字体文件库
import './assets/fonts/iconfont.css'
//导入axiOS库
import axios from 'axios'
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
