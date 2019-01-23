<template>
    <div class="traing-exam">
        <v-touch v-on:swipeleft="onSwipeLeft()"
                 v-on:swiperight="onSwipeRight()"
                 v-if="examsList.question.hasOwnProperty('option_type')"
                 class='animated faster'
                 :class="{'slideInLeft':isSlideLeft,'slideInRight':isSlideRight}">
                <div class="question-content">
                    <div class="item" v-if="examsList.question.option_type == 1">单选题</div>
                    <div class="item" v-if="examsList.question.option_type == 2">多选题</div>
                    <div class="item" v-if="examsList.question.option_type == 3">判断题</div>
                    <div class="question">
                        <div>{{examsList.question.question}}</div>
                        <div class="icon"
                             @click="collectQuestion(isCollect)"
                             :class="isCollect?'collected':'no-collect'"></div>
                    </div>
                    <div class="answer" v-if="examsList.question.option_type == 1">
                        <div class="answer-item"
                             v-for="(result,index) in examsList.options">
                            <input type="radio"
                                   :name='"adviceRadio"+index'
                                   v-model="userAnswer"
                                   :id='"adviceRadio"+index'
                                   :value='result.choice'  hidden/>
                            <label :for='"adviceRadio"+index' class="advice"></label>
                            <span class="radio-name">{{result.choice}}.{{result.content}}</span>
                        </div>
                    </div>
                    <div class="answer" v-if="examsList.question.option_type == 2">
                        <div class="answer-item"
                             v-for="(result,index) in examsList.options">
                            <label>
                                <input type="checkbox"
                                       @change="checkBoxAnswer(result.choice)"
                                       :id='"userCheckBox"+index'
                                       v-model="checkedNames"
                                       :value='result.choice' hidden/>
                                <label :for='"userCheckBox"+index' class="adviceCheckBox" ></label>
                                <span> {{result.choice}}.{{result.content}}</span>
                            </label>
                        </div>
                    </div>
                    <div class="answer" v-if="examsList.question.option_type == 3">
                        <div class="answer-item">
                            <label>
                                <input type="radio" name="checkedAnswer" v-model="userAnswer" id="adviceRadio1" value='A' hidden/>
                                <label for="adviceRadio1" class="advice"></label>
                                <span class="radio-name">A.正确</span>
                            </label>
                        </div>
                        <div class="answer-item">
                            <label>
                                <input type="radio" name="checkedAnswer" v-model="userAnswer" id="adviceRadio2" value='B' hidden/>
                                <label for="adviceRadio2" class="advice"></label>
                                <span class="radio-name">B.错误</span>
                            </label>
                        </div>

                    </div>
                    <div class="answered-content">
                    <span class="answered"
                         v-if="showConfirm ||model === 1|| model ===2"
                         @click="confirmAnswer">确定</span>
                    <span class="answered"
                         v-if="!showConfirm ||model === 1|| model ===2"
                         @click="resultSub()"  >
                        查看答案
                    </span>
                    </div>
                </div>
                <div class="right-answer" v-show="showAnswer">
                    <div class="model-answer">
                        <div class="model-title">
                            <div>标准答案: <span>{{examsList.question.answer}}</span></div>
                            <div class="type-desc">分类:{{examsList.question.type_name}}</div>
                        </div>
                        <div class="model-analyze">
                            {{examsList.question.description}}
                        </div>
                    </div>
                </div>
        </v-touch>
        <div v-else class="empty">
            <div class="icon-empty"></div>
             <span>暂无数据</span>
        </div>
        <div class="exam-foot" v-if="model !== 1 && model !== 2">
            <div class="icon question-right" @click="showQuestionNum()">{{statistics.right_num}}</div>
            <div class="icon question-wrong" @click="showQuestionNum()">{{statistics.error_num}}</div>
            <div class="icon question-totals"@click="showQuestionNum()">{{statistics.all_num}}</div>
        </div>
        <mt-popup
                v-model="popupVisible"
                position="bottom"
                popup-transition="popup-fade">
            <div class="popup-question" :style="{'width':screenWidth+'px','max-height':screenHeight+'px'}">
                <div  class="popup-question" v-if="questionNumList.length >0">
                    <div class="item"
                         :class="[{right:showIdStatus  ==1 ||questionObj.status ==1,
                                    wrong:showIdStatus ==2 ||questionObj.status ==2}]"
                         v-for="(questionObj,idx) in questionNumList"
                         @click="toQuestion(questionObj.id)"
                    >{{idx+1}}</div>
                </div>
                <div class="empty" v-else>
                    暂无数据
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import StoreJs from 'store'
    import {mapState,mapGetter} from 'vuex'
    export default {
        data() {
            return {
                screenWidth:0,
                screenHeight:0,
                popupVisible:false,
                showAnswer:false,
                isCollect:false,
                isSlideLeft: false,
                isSlideRight:false,
                showConfirm:true,
                userAnswer:null,
                userCheckBoxAnswer:'',
                checkedNames:[],
                examsList:{
                    question:{},
                    options:{},
                    answer:null
                },
                statistics:{},
                questionNumList:[],
                showIdStatus:'',
                getOpenId:'',
                question:'',
                type:'1',
                model:''
            };
        },
        methods: {
            checkBoxAnswer(v){
                let th = this;
                th.checkedNames= th.checkedNames.sort();
                th.checkedNames.filter(item => item)
                let arr   =  th.checkedNames.filter(item => item)
                th.userCheckBoxAnswer = arr.sort().join(',');
                console.log("-----th.userCheckBoxAnswer----",th.userCheckBoxAnswer);

            /*    if(th.checkedNames.includes(v)){
                  let idx =   th.checkedNames.findIndex(value => value === v);
                  console.log('idx---',idx)
                    th.checkedNames.splice(idx,1)
                }else{
                    th.checkedNames.push(v);
                }
                th.userCheckBoxAnswer = th.checkedNames.sort().join(',');
                console.log("-----th.userCheckBoxAnswer----",th.userCheckBoxAnswer);*/
            },
            onSwipeLeft(){
                console.log('---onswipeLeft');
                this.isSlideLeft=false;
                this.isSlideRight =true;
                this.showAnswer =false;
                this.type ='2';
                console.log('ts.examsList---',this.examsList);
                this.loadExam();
            },
            onSwipeRight(){
                console.log('---onswipeRight')
                this.isSlideLeft=true;
                this.isSlideRight =false;
                this.type ='0';
                console.log('ts.examsList---',this.examsList);
                this.loadExam();
            },
            confirmAnswer(){
                let ths = this;
                ths.showConfirm = false;
                let params ={
                    openid:ths.getOpenId,
                    question:ths.examsList.question.id,
                    answer:ths.examsList.question.option_type == 2 ? ths.userCheckBoxAnswer:ths.userAnswer
                }
                console.log('showConfirm---',params);
                ths.$api.get('study/submit',params).then((rets)=>{
                    console.log('----rets-----',rets)

                    if(!ths.model){
                        ths.getStatistice();
                    }
                })

            },
            toQuestion(id){
                this.type= '1';
                this.loadExam(id)
                this.popupVisible = false;
                this.showAnswer = false;
            },
            loadExam(changeId){
                let ts = this;
                let params = {
                    openid:ts.getOpenId,
                    question:changeId||ts.examsList['question'].id,
                    type:ts.type,
                    model:ts.model
                }

                ts.$api.get('study/question',params).then((rets)=>{
                    console.log(' question rets---',rets)
                    if(rets.status ==='OK'){
                        ts.showConfirm = true;
                        ts.userAnswer= null;
                        ts.examsList = rets.data;
                        if(rets.data.question.collect == 0){
                            ts.isCollect=false
                        }else{
                            ts.isCollect=true;
                        }
                        console.log('ts.isCollect---',ts.isCollect)

                        if(!rets.data.answer){
                            ts.showConfirm = true;
                        }else{
                            ts.showConfirm = false;
                        }

                        if( ts.examsList.question.option_type == 2){
                            ts.userCheckBoxAnswer = rets.data.answer;
                            ts.checkedNames = rets.data.answer.split(',')
                        }else{
                            ts.userAnswer =rets.data.answer;
                        }
                        if(!ts.model){
                            ts.getStatistice();
                        }
                    }
                })
                setTimeout(function () {
                    ts.isSlideLeft=false;
                    ts.isSlideRight =false;
                },500)
            },
            getStatistice(){
                let ts = this;
                ts.$api.get('study/statistics',{openid:ts.getOpenId}).then((typeResult)=>{
                    if(typeResult.status == 'OK'){
                        ts.statistics = typeResult.data;
                    }
                })
            },
            resultSub(){
                let that = this;
                that.showAnswer = true;
            },
            collectQuestion(flag){
                let _ths = this;
                _ths.isCollect = !flag;
               let params ={
                   openid:_ths.getOpenId,
                   question:_ths.examsList.question.id,
                   option: _ths.isCollect?'1':'0'
               };
               _ths.$api.get('study/collect',params).then((rets)=>{
                        _ths.$mint.Toast({
                            message:rets.message,
                            position:'center'
                        })
               })
            },
            showQuestionNum(){
                let ts = this;
                ts.$api.get('study/list',{openid:ts.getOpenId,type:3}).then((ret)=>{
                    console.log('study/list---',ret);
                    if(ret.status == 'OK'){
                        ts.questionNumList=[];
                        ts.questionNumList= ret.data;
                        console.log('ts.questionNumList----',ts.questionNumList)
                        ts.popupVisible =true;
                        //ts.showIdStatus = questionType;
                    }else{

                    }
                })

            }
        },
        mounted: function () {
            let ths  = this;
            ths.screenWidth = document.body.clientWidth;
            ths.screenHeight = document.body.clientHeight / 1.5;
            ths.getOpenId = ths.$store.getters['GET_OPENID'];
            ths.model = ths.$route.query.model;
            console.log('ths.model ---',ths.model )
            this.loadExam();
        }
    }

</script>

<style lang="scss">
    .traing-exam{
        height: 100vh;
        .empty{
            color: #1296db;
            text-align: center;
            font-size: 18px;/*no*/
            margin: 60px;
            .icon-empty{
                background: url("../assets/image/icon-collect-empty.png") no-repeat;
                background-size: 100% 100%;
                width: 68px;
                height: 68px;
                margin: 20px auto;
            }
        }
        font-size: 14px;/*no*/
        .advice{
            height: 25px;
            width: 25px;
            display: inline-block;
            background-image: url('../assets/image/icon-radio-uncheck.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            vertical-align: middle;
            margin-top: -4px;
            margin-right: 10px;
        }
        input[type="radio"]:checked + .advice{
            background-image: url('../assets/image/icon-radio-checked.png');
        }
        .adviceCheckBox{
            height: 25px;
            width: 25px;
            display: inline-block;
            background-image: url('../assets/image/icon-checkbox-uncheck.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center;
            vertical-align: middle;
            margin-top: -4px;
            margin-right: 10px;
        }
        input[type="checkbox"]:checked + .adviceCheckBox{
            background-image: url('../assets/image/icon-checkbox-checked.png');
        }
        .question-content{
            padding: 20px 10px;
            background: #ffffff;
            font-size: 14px;/*no*/
            .item{
                font-size: 18px;/*no*/
                padding-bottom: 10px;
            }
            .question{
                margin-bottom: 5px;
                padding:0 10px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .icon{
                    display: inline-block;
                    width:38px;
                    height: 35px;
                    margin: auto;
                }
                .collected{
                    background: url("../assets/image/icon-collected.png") no-repeat;
                    background-size: 100% 100%;
                }
                .no-collect{
                    background: url("../assets/image/icon-uncollect.png") no-repeat;
                    background-size: 100% 100%;
                }
            }
            .answer{
                padding: 10px;
                .answer-item{
                    padding: 10px 0;
                }
            }
            .answered-content{
                display: flex;
                justify-content: flex-end;
                .answered{
                    text-align: right;
                    color: #1296db;
                    padding: 0 10px;
                }
            }
        }
        .right-answer{
            margin: 10px 0;
            background: #fff;
            padding: 20px 10px;
            .model-answer{
                .model-title{
                    color: #ff4c1e;
                    margin-bottom: 10px;
                    .type-desc{
                        font-size: 12px;/*no*/
                        color: #a9acb1;
                    }
                }
            }

        }
        .exam-foot{
            display: flex;
            flex: 1;
            height: 35px;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            font-size: 18px;/*no*/
            background: #fff;
            font-weight: 600;
            .icon{
                width: 100px;
                height: 55px;
                line-height: 55px;
                padding-left: 30px;
                align-items: center;
                font-size: 14px;/*no*/
            }
            .question-totals{
                background: url("../assets/image/icon-totals.png");
                background-size: 25px 25px;
                background-repeat: no-repeat;
                background-position: center left;
            }
            .question-right{
                background: url("../assets/image/icon-right.png");
                background-size: 25px 25px;
                background-repeat: no-repeat;
                background-position: center left;
                color: #1296db;

            }
            .question-wrong{
                background: url("../assets/image/icon-false.png");
                background-size: 25px 25px;
                background-repeat: no-repeat;
                background-position: center left;
                color: #d81e06;
            }
        }
        .popup-question{
            width: 100%;
            min-height: 200px;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: flex-start;
            overflow-y: scroll;
            padding: 10px;
            .empty{
               text-align: center;
                margin: auto;
                width: 100%;
            }
            .item{
                width: 50px;
                height: 50px;
                line-height: 50px;
                margin: 10px 5px 5px 5px;
                border: 1px solid #d8d8d8;/*no*/
                border-radius: 50%;
                align-items: center;
                text-align: center;
                background: #fff;
            }
            .item:active{
                background:rgba(0,0,0,0.1);
                border: 1px solid rgba(0,0,0,0.1);/*no*/
                color: #fff;
            }
            .right{
                background: #1296db;
                color: #fff;
                border: 1px solid #1296db;/*no*/
            }
            .right:active{
                background: #0db7db;
            }
            .wrong{
                background: #ff0000;
                border: 1px solid #ff0000;/*no*/
                color: #fff;
            }
            .wrong:active{
                background: #ff2f23;
            }
        }
    }

</style>
