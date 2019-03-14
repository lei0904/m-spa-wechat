const state = {
    paperInfo : null
}

const mutations = {
    SetPaperInfo(state,data){
        state['paperInfo'] = data;
        console.log('---paperInfo---',data);
    }
}

const getters = {
    GetPaperInfo(state){
        return state['paperInfo'];
    }
}

export default {
    state,
    mutations,
    getters
}