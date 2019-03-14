import Vue from 'vue'
import Router from 'vue-router'

// 懒加载方式，当路由被访问的时候才加载对应组件
const Index = resolve => require(['@/views/Index'], resolve);

const ExamIndex = resolve => require(['@/views/ExamIndex'], resolve);
const ExamTypeOption = resolve => require(['@/views/ExamTypeOption'], resolve);
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


const Attachment = resolve => require(['@/views/Attachment'], resolve);

const test = resolve => require(['@/views/test'], resolve);





Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      name:'首页',
      meta:{
          title: '首页'
      }
    },
    {
        path: '/examIndex',
        component: ExamIndex,
        meta:{
            title: '在线考试'
        }
    },
    {
        path: '/examTypeOption',
        component: ExamTypeOption,
        meta:{
            title: '培训考核类型'
        }
    },
    {
      path: '/exams',
      component: Exam,
        meta:{
            title: '培训学习',
        }
    },
    {
        path: '/examResult',
        component: ExamResult,
        meta:{
            title: '考试结果',
        }
    },
    {
        path: '/examRecord',
        component: ExamRecord,
        meta:{
            title: '考试记录',
        }
    },
    {
      path: '/register',
      component: Register,
        meta:{
            title: '实名认证',
        }
    },
    {
      path: '/registerNote',
      component: RegisterNote,
        meta:{
            title: '认证审核',
        }
    },
    {
      path: '/registerInfo',
      component: RegisterInfo,
        meta:{
            title: '在线报名',
        }
    },
    {
      path: '/order',
      component: Order,
        meta:{
            title: '我的订单',
        }
    },
    {
        path: '/buyTextBook',
        component: BuyTextBook,
        meta:{
            title: '购买教材',
        }
    },
    {
        path: '/trainingIndex',
        component: TrainingIndex,
        meta:{
            title: '培训学习',
        }
    },
    {
        path: '/trainingExam',
        component: TrainingExams,
        meta:{
            title: '培训练习',
        }
    },
    {
        path: '/traningCollected',
        component: TraningCollected,
        meta:{
            title: '我的收藏',
        }
    },
    {
        path: '/attachment',
        component: Attachment,
        meta:{
            title: '培训讲义'
        }
    },

   {
       path: '/test',
       component: test,
       meta:{
           title: '测试',
       }
   },
  ]
});

router.beforeEach((to,from,next)=>{
    console.log(to,from)
    if(to.meta.title){
        document.title = to.meta.title
    }
    next();

})

export default router
