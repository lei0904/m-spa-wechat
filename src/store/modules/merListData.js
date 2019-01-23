import Api from '../../api/api'
const state = {
    MEMBER_LIST : null
}

const mutations = {
    COMMIT_MEMBER_LIST(state,data){
        state['MEMBER_LIST'] = data;
      //  console.log('---COMMIT_MEMBER_LIST----',state['MEMBER_LIST']);
    }
}

const  actions = {
    SET_MEMBER_LIST({commit}){
        Api.get('mer/list').then((rets)=>{
            console.log('---SET_MEMBER_LIST----',rets.data);
            commit('COMMIT_MEMBER_LIST',rets.data);
        });
    }
}

const getters = {
    GET_MEMBER_LIST(state){
      //  console.log('---GET_MEMBER_LIST----',state['MEMBER_LIST']);
        return state['MEMBER_LIST'];
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}