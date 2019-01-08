import Vue from 'vue'
import Router from 'vue-router'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Index = resolve => require(['@/views/Index'], resolve);
const Exam = resolve => require(['@/views/Exam'], resolve);

const Register = resolve => require(['@/views/Register'], resolve);

const registerNote = resolve => require(['@/views/registerNote'], resolve);
const Order = resolve => require(['@/views/Order'], resolve);



Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      title: '首页'
    },
    {
      path: '/exams',
      component: Exam,
      title: '培训学习'
    },
    {
      path: '/register',
      component: Register,
      title: '实名认证'
    },
    {
      path: '/registerNote',
      component: registerNote,
      title: '认证审核'
    },
    {
      path: '/order',
      component: Order,
      title: '我的订单'
    },

  ]
});


export default router
