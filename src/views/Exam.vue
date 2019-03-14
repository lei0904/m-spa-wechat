<template>
  <div class="exam">
    <div v-if="!isEmpty">
      <v-touch
              name="custom-classes-transition"
              enter-active-class="animated tada"
              leave-active-class="animated bounceOutRight"
              class='animated faster'
              :class="{'slideInRight':isSlideLeft}">
        <div class="question-content"
             v-if="examsList.question.hasOwnProperty('option_type')">
          <div class="item" v-if="examsList.question.option_type == 1">单选题</div>
          <div class="item" v-if="examsList.question.option_type == 2">多选题</div>
          <div class="item" v-if="examsList.question.option_type == 3">判断题</div>
          <div class="question">
            <div>{{examsList.question.question}}</div>
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
                          @click="confirmAnswer">确定</span>
          </div>
        </div>
      </v-touch>
      <div class="exam-foot">
        <div class="exam-time-total">
          <span>剩余时间:</span>
          <span class="count-down">{{countDownTimes}}</span>
        </div>
        <div class="question-totals">{{examsList.index}}/{{examsItem.total}}</div>
      </div>
    </div>
    <div v-if ='isEmpty' class="empty">
      <div class="icon-empty"></div>
      <div>暂无考题</div>
    </div>
  </div>
</template>
<script>
  import Moment from 'moment'
  export default {
    data() {
      return {
          examsItem:null,
          times:0,
          countDownTimes:0,
          openid:'',
          userAnswer:null,
          userCheckBoxAnswer:'',
          checkedNames:[],
          isEmpty:false,
          isSlideLeft:false,
          examsList:{
              question:{},
              options:{},
              answer:null
          }
      };
    },
    methods: {
      loadExam(){
          let ts = this;
          let params ={
              openid:ts.openid,
              paper:ts.examsItem.id
          }
          ts.$api.get('check/question',params).then((rets)=>{
              console.log('question---',rets.data)
              let data = rets.data;
              if(rets.status ==='OK'){
                  if(data.index<0){
                      ts.isEmpty =true;
                  }else{
                      ts.isEmpty =false;
                      ts.isSlideLeft =true;
                  }

                ts.examsList = rets.data;
              }else{
                  ts.$mint.Toast({
                      message:rets.message,
                      position:'center'
                  })
              }
          })
      },
        confirmAnswer(){
            let ths = this;
            ths.showConfirm = false;
            ths.isSlideLeft =true;

            let params ={
                openid:ths.openid,
                question:ths.examsList.question.id,
                paper:ths.examsItem.id,
                time:Math.floor(ths.times / 60),
                answer:ths.examsList.question.option_type == 2 ? ths.userCheckBoxAnswer:ths.userAnswer
            }
            console.log('showConfirm---',params);
            ths.$api.get('check/submit',params).then((rets)=>{
                console.log('----rets-----',rets)
                if(rets.status === 'OK'){
                    ths.userCheckBoxAnswer=[];
                    ths.userAnswer=null;
                  if( ths.examsList.index < ths.examsItem.total && ths.examsList.index >0){
                      ths.loadExam();
                  }else{
                      console.log('最后一题。。。。')
                      ths.$router.push({path:'/examResult'})
                  }
                }
                setTimeout(function () {
                    ths.isSlideLeft=false;
                },500)
            })

        },

        checkBoxAnswer(){
            let th = this;
            th.checkedNames= th.checkedNames.sort();
            th.checkedNames.filter(item => item)
            let arr   =  th.checkedNames.filter(item => item)
            th.userCheckBoxAnswer = arr.sort().join(',');
            console.log("-----th.userCheckBoxAnswer----",th.userCheckBoxAnswer);
        },
      resultSub(item){
        console.log('resutlSub---',item)
          let that = this;
        that.$router.push({'path':'examResult'})
      }

    },
    mounted: function () {
        let ths = this;
        ths.examsItem = ths.$store.getters['GetPaperInfo'];
        console.log('GetPaperInfo---',ths.examsItem)
        ths.openid = ths.$store.getters['GET_OPENID']

        ths.times =  ths.examsItem.duration * 60;
        let h,m,s;
        ths.$api.get('check/init',{openid:ths.openid,paper:ths.examsItem.id}).then(rets =>{
            if(rets.status === 'OK'){
                ths.loadExam()
            }else{
                ths.$mint.Toast({
                    message:rets.message,
                    position:'center'
                })
            }
        })
        let t = window.setInterval(function () {
            ths.times  = --ths.times;
             h = Math.floor(ths.times  / 60 / 60);
             m = Math.floor(ths.times  / 60 % 60);
             s = Math.floor(ths.times  % 60);
            h = h < 10 ? ("0" + h) : h;
            m = m < 10 ? ("0" + m) : m;
            s = s < 10 ? ("0" + s) : s;
            ths.countDownTimes = h+':'+m+':'+s
        },1000)
        if(ths.times<=0){
            window.clearInterval(t);
        }

    }
  }

</script>

<style lang="scss">
  .exam{
    height: 100vh;
    .empty{
      color: #1296db;
      text-align: center;
      font-size: 18px;/*no*/
      margin: 60px;
      .icon-empty{
        background: url("../assets/image/icon-empty.png") no-repeat;
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
      .exam-time-total{

      }
      .question-totals{
      }
    }
  }

</style>
