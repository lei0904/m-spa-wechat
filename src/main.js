import "babel-polyfill"
import Vue from 'vue'
import App from './App.vue'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import 'animate.css'


import FastClick from 'fastclick'
FastClick.attach(document.body)
/*
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';*/

import  AttrPicker from './components/AttrPicker/index.vue'
Vue.component('cui-attr-picker',AttrPicker);

import  StartScore from './components/StartScore/index.vue'
Vue.component('start-score',StartScore);


import '@/assets/iconfont.css'
import '@/assets/base.css'
import '@/assets/flexible.js'
import router from './router'
import store from './store'
import './validators/index.js'

 import VueTouch from 'vue-touch'

Vue.use(VueTouch);

// import Mock from './mock'

import Ces from './ces/ces.js'
Vue.prototype.$ces = Ces;


// Mock.init()
Vue.config.productionTip = false;


Vue.use(MintUI);

Vue.prototype.$mint =MintUI;

import AddressChild from './components/AddressPicker/address-child.vue'
Vue.component('cui-address-child', AddressChild);

import api from './api/api'
Vue.prototype.$api = api;

/* eslint-disable no-new */
Ces.ready(function () {
  new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
    render: h => h(App)
  });
 /* document.addEventListener('click',function (e) {
    console.log('绑定点击事件提交后台事件池------',e);

  })*/
});
if (module.hot) {
  module.hot.accept();
}



