import Api from '../../api/api'
const state = {
    WORK_TYPE : null
}

const mutations = {
    COMMIT_WORK_TYPE(state,data){
        state['WORK_TYPE'] = data;
      //  console.log(' -----COMMIT_WORK_TYPE----', state['WORK_TYPE'])
    }
}

const  actions = {
    SET_WORK_TYPE({commit}){
        Api.get('job/list').then((rets)=>{
            commit('COMMIT_WORK_TYPE',rets.data);
            console.log('----SET_WORK_TYPE----',rets.data)
        });
    }
}

const getters = {
    GET_WORK_TYPE(state){
           // console.log('---GET_WORK_TYPE----',state['WORK_TYPE'])
            return state['WORK_TYPE'];
        }
}

export default {
    state,
    actions,
    mutations,
    getters
}