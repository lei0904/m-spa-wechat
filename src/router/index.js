import Vue from 'vue'
import Router from 'vue-router'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Index = resolve => require(['@/views/Index'], resolve);

const ExamIndex = resolve => require(['@/views/ExamIndex'], resolve);
const Exam = resolve => require(['@/views/Exam'], resolve);
const ExamResult = resolve => require(['@/views/ExamResult'], resolve);
const ExamRecord = resolve => require(['@/views/ExamRecord'], resolve);


const Register = resolve => require(['@/views/Register'], resolve);
const RegisterNote = resolve => require(['@/views/registerNote'], resolve);
const RegisterInfo = resolve => require(['@/views/registerInfo'], resolve);
const Order = resolve => require(['@/views/Order'], resolve);

const BuyTextBook = resolve => require(['@/views/BuyTextBook'], resolve);

//培训学习
const TrainingIndex = resolve => require(['@/views/TrainingIndex'], resolve);
const TrainingExams = resolve => require(['@/views/TraningExam'], resolve);
const TraningCollected = resolve => require(['@/views/TraningCollected'], resolve);





Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      title: '首页'
    },
    {
        path: '/examIndex',
        component: ExamIndex,
        title: '培训考核首页'
    },
    {
      path: '/exams',
      component: Exam,
      title: '培训学习'
    },
    {
        path: '/examResult',
        component: ExamResult,
        title: '考试结果'
    },
    {
        path: '/examRecord',
        component: ExamRecord,
        title: '考试记录'
    },
    {
      path: '/register',
      component: Register,
      title: '实名认证'
    },
    {
      path: '/registerNote',
      component: RegisterNote,
      title: '认证审核'
    },
    {
      path: '/registerInfo',
      component: RegisterInfo,
      title: '认证信息'
    },
    {
      path: '/order',
      component: Order,
      title: '我的订单'
    },
    {
        path: '/buyTextBook',
        component: BuyTextBook,
        title: '购买教材'
    },
    {
        path: '/trainingIndex',
        component: TrainingIndex,
        title: '购买教材'
    },
    {
        path: '/trainingExam',
        component: TrainingExams,
        title: '培训练习'
    },
    {
        path: '/traningCollected',
        component: TraningCollected,
        title: '我的收藏'
    },
  ]
});


export default router
