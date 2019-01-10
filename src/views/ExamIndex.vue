<template>
  <div class="exam-index">
      <div class="exam-desc">
        考试规范
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
          count:5
      };
    },
    methods: {
        toExam() {
            let ts = this;
            ts.$mint.MessageBox.confirm('是否确定开启考试?考试期间:' +
                '<div style="text-align: left">a.不可打开培训学习页面</div>' +
                '<div style="text-align: left">b.可以断线重连，显示剩余考试时间</div>',
                '提示').then(function () {
                ts.$router.push({path: 'exams'})
            })
        },
        toExamRecord(){
            this.$router.push({path: '/examRecord'})
        }
    },
    mounted: function () {

    }
  }

</script>

<style lang="scss">
  .exam-index{
    .exam-desc{
      height: 288px;
      padding: 10px;
    }
    .exam-options{
      margin: 20px 0;
      .item{}
    }
  }

</style>
