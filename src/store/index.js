import Vue from 'vue'
import Vuex from 'vuex'

//import Logger from '../plugins/logger'

import jobTypeData from './modules/jobTypeData.js'
import nationData from './modules/nationData.js'
import questionData from './modules/questionData.js'
import merListData from './modules/merListData.js'
import openId from './modules/openId.js'


const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      nationData,
      jobTypeData,
      merListData,
      questionData,
      openId
  },
  strict: debug,
  //  plugins: debug ? [Logger()] : []
    plugins: debug ? [] : []
})
