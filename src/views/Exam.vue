<template>
  <div class="exam">
      <v-touch v-on:swipeleft="onSwipeLeft()"  v-on:swiperight="onSwipeRight()">
        <transition
                name="custom-classes-transition"
                enter-active-class="animated tada"
                leave-active-class="animated bounceOutRight">
          <div class="question-content">
            <div class='animated faster' :class="{'slideInLeft':isSlideLeft,'slideInRight':isSlideRight}">
              <div class="item" v-if="examsList.questionType == 0">单选题</div>
              <div class="item" v-if="examsList.questionType == 1">多选题</div>
              <div class="item" v-if="examsList.questionType == 2">判断题</div>
              <div class="question">{{examsList.idx}}.{{examsList.question}}</div>
              <div class="answer">
                <div class="answer-item" v-for="result in examsList.answer" @click="resultSub(result)">
                  <span>{{result.id}}</span> <span>{{result.solution}}</span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </v-touch>
    <div class="exam-foot">
      <div class="exam-time-total"><span>剩余时间:</span><span class="count-down">{{countDownTime}}</span></div>
      <div class="question-totals">{{examsList.idx}}/{{examsList.totals}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
          isSlideLeft: false,
          isSlideRight:false,
          countDownTime:300,
           examsList:{
               totals:50,
               questionType:Math.floor(Math.random()*3),
               idx:1,
               question:'工作中如果遇到醉酒顾客闹事该怎么处理?',
               answer:[
                   {id:'A',solution:' 报告经理'},
                   {id:'B',solution:' 打电话报警寻求帮助'},
                   {id:'C',solution:' 喊保安'}]
           }
      };
    },
    methods: {
      onSwipeLeft(){
        console.log('---onswipeLeft');
          this.isSlideLeft=false;
          this.isSlideRight =true;
          this.loadExam();
      },
      onSwipeRight(){
        console.log('---onswipeRight')
          this.isSlideLeft=true;
          this.isSlideRight =false;
          this.loadExam();
      },
      loadExam(){
          let ts = this;
          let tempList =ts.examsList;
         // this.examsList=[];
          console.log(tempList)
              tempList.idx= tempList.idx+1;
              tempList.question =(tempList.question) + tempList.idx;
              for(let j=0; j<tempList.answer.length;j++){
                  tempList.answer[j].solution = tempList.answer[j].solution+tempList.idx;
              }
          ts.examsList={};
          ts.examsList=tempList
          setTimeout(function () {
              ts.isSlideLeft=false;
              ts.isSlideRight =false;
          },500)
      },
      resultSub(item){
        console.log('resutlSub---',item)
          let that = this;
        that.$router.push({'path':'examResult'})
      }
    },
    mounted: function () {

    }
  }

</script>

<style lang="scss">
  .exam{
    height: 100vh;
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
