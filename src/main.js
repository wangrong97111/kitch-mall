// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import 'es6-promise/auto'

import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible'

import CommonJs from './assets/js/common.js'
import http from './assets/js/http.js'
import loadding from './assets/js/loadding'
import cookies from 'vue-js-cookie'

Vue.use(CommonJs)
Vue.use(MintUI)
Vue.use(cookies)

Vue.config.productionTip = false
Vue.filter('money', function (value,type) {
    return "¥"+ value.toFixed(2) +type;

})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
