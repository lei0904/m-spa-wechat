import Api from '../../api/api'
const state = {
    NATION : null
}

const mutations = {
    COMMIT_NATION(state,data){
        state['NATION'] = data;
       // console.log('---NATION---',data)
    }
}

const  actions = {
    SET_NATION({commit}){
        Api.get('china/nation').then((rets)=>{
            commit('COMMIT_NATION',rets.data);
            console.log('---SET_NATION---',rets.data)
        });
    }
}

const getters = {
    GET_NATION(state){
       // console.log('---GET_NATION---',state['NATION'])
        return state['NATION'];
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}