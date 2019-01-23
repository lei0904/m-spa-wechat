//import router from '../../router'
import StoreJs from 'store'


const compareArrSort = function (key) {
    return function(obj1,obj2){
        let value1 = obj1[key];
        let value2 = obj2[key];
        return value1 - value2;     // 升序
    }
}

const state = {
    'currentQuestion':null
};

const mutations = {
    setCurrentQuestion(state,data){
        state['currentQuestion'] = data;

        let hash ={},
            _temp  = [data],
            newArr = [],
            reduceArr=[],
            oldArr = [];

        if(StoreJs.get('questionDataList')){
            oldArr = StoreJs.get('questionDataList');
            newArr = oldArr.concat(_temp);
        }else{
            newArr = _temp;
        }
        //数组去重
        if(newArr.length>1){
            reduceArr = newArr.reduceRight((item,next)=>{
                hash[next.idx] ? '' : hash[next.idx] = true && item.push(next);
                return item
            }, []);
            let sortArr =reduceArr.sort(compareArrSort('idx'));
            StoreJs.set('questionDataList',sortArr);
        }else{
            StoreJs.set('questionDataList',newArr);
        }
    },
    delQuestionList(state,data){
        console.log(state,data)
        let tempArr =[data];
        let oldArr =  StoreJs.get('questionDataList');
        let tempDelArr=oldArr.filter(item=>!tempArr.some(ele=>ele.idx===item.idx));
        let sortArr  = tempDelArr.sort(compareArrSort('idx'));
        StoreJs.set('questionDataList',sortArr);
    }
};

const getters = {
    getCurrentQuestion(){
        console.log('getCurrentQuestion----',state);
        return state['currentQuestion']
    },
    getQuestionList(){
        let  _tempQuestionList = StoreJs.get('questionDataList');
        console.log('_tempQuestionList length',_tempQuestionList)
        return _tempQuestionList;
    }
};


export default {
    state,
    getters,
    mutations
}
