import Vue from 'vue'
import Vuex from 'vuex'

//import Logger from '../plugins/logger'

import userData from './modules/userData.js'
import questionData from './modules/questionData.js'


const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      userData,
      questionData
  },
  strict: debug,
  //  plugins: debug ? [Logger()] : []
    plugins: debug ? [] : []
})
