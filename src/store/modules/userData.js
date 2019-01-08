//import router from '../../router'

const state = {
    'userData': null
}

const mutations = {
    setUserData (state, data) {
      console.log('userData--',data)
        state['userData'] = data;
      console.log( state['userData']);
    }
};

const getters = {
    getUserData() {
      console.log('state["userData"]',state)
        return state['userData']
    }
}

export default {
    state,
    getters,
    mutations
}
