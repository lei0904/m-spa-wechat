<template>
    <div class="traing-exam">
        <v-touch v-on:swipeleft="onSwipeLeft()"
                 v-on:swiperight="onSwipeRight()"
                 class='animated faster'
                 :class="{'slideInLeft':isSlideLeft,'slideInRight':isSlideRight}"
                 v-show ='!isEmpty'>
            <div class="question-content">
                <div class="item" v-if="examsList.questionType == 0">单选题</div>
                <div class="item" v-if="examsList.questionType == 1">多选题</div>
                <div class="item" v-if="examsList.questionType == 2">判断题</div>
                <div class="question">
                    <div >{{examsList.idx}}.{{examsList.question}}</div>
                    <div class="icon"
                         @click="collectQuestion(isCollect)"
                         :class="isCollect?'collected':'no-collect'"></div>
                </div>
                <div class="answer">
                    <div class="answer-item"
                         v-for="result in examsList.answer"
                         @click="resultSub(result)">
                        <span>{{result.id}}</span>
                        <span>{{result.solution}}</span>
                    </div>
                </div>
            </div>
            <div class="right-answer" v-show="showAnswer">
                <div class="model-answer">
                    <div class="model-title">
                        <div>标准答案: <span>ABC</span></div>
                        <div class="type-desc">分类:法律规范</div>
                    </div>
                    <div class="model-analyze">
                        解析：遇到事情不要紧张，酒吧都是有后台的，不怕狠人，只要有钱什么事都好说
                    </div>
                </div>
            </div>
        </v-touch>
        <div class="empty" v-show="isEmpty">
            <div class="icon-empty"></div>
            <div class="empty-desc">暂无收藏题目</div>
        </div>
        <div class="exam-foot">
            <div class="icon question-right" @click="showQuestionNum(1)">0</div>
            <div class="icon question-wrong" @click="showQuestionNum(2)">1</div>
            <div class="icon question-totals"@click="showQuestionNum(3)">{{examsList.idx}}/{{examsList.totals}}</div>
        </div>
        <mt-popup
                v-model="popupVisible"
                position="bottom"
                popup-transition="popup-fade">
            <div class="popup-question" :style="{'width':screenWidth+'px','max-height':screenHeight+'px'}">
                <div class="item"
                     v-if="showIdStatus == questionObj.status"
                     :class="[{right:questionObj.status ==1,wrong:questionObj.status ==2}]"
                     v-for="(questionObj,idx) in questionNumList" >{{questionObj.id}}</div>

                <div class="item"
                     v-if="showIdStatus == 3"
                     :class="[{right:questionObj.status ==1,wrong:questionObj.status ==2}]"
                     v-for="(questionObj,idx) in questionNumList" >{{questionObj.id}}</div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    //import {getQuestionData,setQuestionData} from 'vuex'
    import StoreJs from 'store'
    import {mapMutations,mapGetters} from 'vuex'
    export default {
        data() {
            return {
                isEmpty:true,
                screenWidth:0,
                screenHeight:0,
                popupVisible:false,
                showAnswer:false,
                isCollect:true,
                isSlideLeft: false,
                isSlideRight:false,
                allowed:false,
                examsList:{},
                questionNumList:[],
                showIdStatus:'',
                start:0,
                questionListData:[]
            };
        },
        methods: {
            onSwipeLeft(){
                console.log('---onswipeLeft');
                this.isSlideLeft=false;
                this.isSlideRight =true;
                this.showAnswer =false;
                if(this.start<=this.questionListData.length - 1 ){
                    this.start = this.start +1;
                    this.loadExam();
                }else{

                }
            },
            onSwipeRight(){
                console.log('---onswipeRight')
                this.isSlideLeft=true;
                this.isSlideRight =false;
                if(this.start>=0){
                    this.start = this.start - 1;
                    this.loadExam();
                }
            },
            loadExam(){
               let ts = this;
                console.log(ts.start, ts.questionListData.length -1 )
                if( ts.questionListData.length>0){

                    if( ts.start>-1 &&  ts.start< ts.questionListData.length){
                        Object.assign(ts.examsList,ts.questionListData[ts.start]);
                        ts.isEmpty =false;
                        ts.allowed =true;
                        setTimeout(function () {
                            ts.isSlideLeft=false;
                            ts.isSlideRight =false;
                        },500)

                    }else{
                        if(ts.start<=-1 &&  ts.allowed){
                            ts.$mint.Toast({
                                message:'不能再往前翻啦...'
                            })
                            ts.start = 0;
                            ts.allowed =false;
                        }
                        if(ts.start>= ts.questionListData.length -1 &&  ts.allowed){
                            ts.$mint.Toast({
                                message:'真厉害!翻到最后啦'
                            })
                            ts.start = ts.questionListData.length -1;
                            ts.allowed =false;
                        }
                    }
                }else{
                    ts.isEmpty =true;
                    ts.allowed = true;
                }
            },
            resultSub(item){
                console.log('resutlSub---',item)
                let that = this;
                that.showAnswer = true;
                //that.$router.push({'path':'/examResult'})
            },
            collectQuestion(flag){
                this.isCollect = !flag;
                let _temp = Object.assign({},this.examsList);
                if(this.isCollect){
                    this.$store.commit('setCurrentQuestion',_temp)
                }else{
                    this.$store.commit('delQuestionList',_temp)
                }
            },
            showQuestionNum(questionStatus){
                this.popupVisible =true;
                this.showIdStatus = questionStatus
            }
        },
        mounted() {
            this.screenWidth = document.body.clientWidth;
            this.screenHeight = document.body.clientHeight / 1.5;
            for(let i=1;i<=100;i++){
                let _tempStatus =0;
                if(i<=5){
                    _tempStatus =1;
                }else if(i<=8){
                    _tempStatus =2;
                }else if(i<=20){
                    _tempStatus =1;
                }
                let _temp = {
                    status:_tempStatus,
                    id:i
                };
                this.questionNumList.push(_temp)
            }
            this.questionListData = StoreJs.get('questionDataList')//this.$store.getters.getQuestionList;
            console.log(this.questionListData,)
            this.loadExam();
        }
    }

</script>

<style lang="scss">
    .traing-exam{
        height: 100vh;
        font-size: 14px;/*no*/
        .empty{
            position: relative;
            justify-content: center;
            .icon-empty{
                background: url("../assets/image/icon-empty.png") no-repeat;
                background-size:100%;
                background-position: center center;
                width: 75px;
                height: 75px;
                margin:40px auto 20px;
            }
            .empty-desc{
                text-align: center;
                font-size: 16px;/*no*/
            }
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
