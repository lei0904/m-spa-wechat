//import router from '../../router'

const state = {
    'questionData': null
}

const mutations = {
    setQuestionData (state, data) {
        console.log('questionData--',data)
        state['questionData'] = data;
        console.log( state['questionData']);
    }
};

const getters = {
    getQuestionData() {
        console.log('state["questionData"]',state)
        return state['questionData']
    }
}

export default {
    state,
    getters,
    mutations
}
