<template>
  <div class="RegisterNote">
    <div class="note-content">
      <div class="note-info">您的信息正在由 <span class="unit">南门游戏厅</span> 审核！！！</div>
      <div class="note-help">如需帮助，请联系商户（<input class="help-tel" type="tel" v-model="helpTel" :disabled="true"/> ）</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        helpTel:13823445456
      };
    },
    methods: {
    },
    mounted: function () {
    }
  }

</script>

<style lang="scss">
  .RegisterNote {
    .note-content{
      margin: 80px 20px;
      font-size: 14px;/*no*/
      text-align: center;
      .unit{
        color: #26a2ff;
        font-size: 16px;/*no*/
      }
      .note-help{
        font-size: 12px;/*no*/
        .help-tel{
          font-size: 14px;/*no*/
          color: #26a2ff;
          background-color:rgba(0,0,0,0);
          border: 0;
          text-align: center;
          width: 100px;
        }
      }
    }
  }
</style>
