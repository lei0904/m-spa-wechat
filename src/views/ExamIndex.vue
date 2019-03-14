<template>
  <div class="exam-index">
      <div class="exam-desc">
        <div class="title">上海沐浴行业从业人员培训(沐浴、足浴、会所、美容美发(含桑拿))</div>
        <div  class="standard" >
          <div class="items" v-for="item in examsType">
            {{item.name}}
          </div>
        </div>
      </div>
    <div class="exam-options">
      <div class="item" @click="toExam">
        <mt-cell title="在线考试" label="在线认证服务" is-link></mt-cell>
      </div>
      <div class="item"@click="toExamRecord">
        <mt-cell title="考试记录" label="查询历史考试记录" is-link>
          <span>{{count}}条记录</span>
        </mt-cell>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
          count:0,
          examsType:[]
      };
    },
    methods: {
        toExam() {
            let ts = this;
            ts.$router.push({path: 'examTypeOption'})
        },
        toExamRecord(){
            this.$router.push({path: '/examRecord'})
        }
    },
    mounted: function () {
          let ths = this;
          let openid = ths.$store.getters['GET_OPENID'];
          ths.$api.get('study/types',{openid:openid}).then((rets)=>{
              console.log('rets----',rets)
              if(rets.status === 'OK'){
                  ths.examsType = rets.data;
              }else{
                  ths.$mint.Toast({
                      message:rets.message,
                      position:'center'
                  })
              }
          })
        ths.$api.get('check/results',{openid:openid}).then((rets)=>{
            console.log('results----',rets)
            if(rets.status == 'OK'){
                ths.count = rets.data.length;
            }
        })
    }
  }

</script>

<style lang="scss">
  .exam-index{
    .exam-desc{
      height: 288px;
      padding: 10px;
      background-color: #1296db;
      color: #fff;
      .title{
        text-align: center;
      }
      .standard{
        margin: 20px 0;
        display: flex;
        flex: 1;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
        .items{
          font-size: 14px;/*no*/
          border: 1px solid #fff;
          margin: 20px;
          padding: 20px;
          text-align: center;
          border-radius: 5px;
          .icon{
            width: 35px;
            height: 35px;
          }
        }
      }
    }
    .exam-options{
      margin: 20px 0;
      .item{}
    }
  }

</style>
