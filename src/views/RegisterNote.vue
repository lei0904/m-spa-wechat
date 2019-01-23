<template>
  <div class="RegisterNote">
    <div class="note-content">
      <div class="note-info">您的信息正在由 <span class="unit">{{form.mer_name}}</span> 审核！！！</div>
      <div class="note-help">如需帮助，请联系商户（<input class="help-tel" type="tel" v-model="form.principal_phone" :disabled="true"/> ）</div>
    </div>
  </div>
</template>
<script>
    import { mapState, mapMutations , mapGetters} from 'vuex';
  export default {
    data() {
      return {
        openId:'',
        form:{}
      };

    },
      computed:{
          ...mapState([
              'OPENID'
          ]),
          ...mapGetters([
              'GET_OPENID'
          ]),
          getOpenId(){
              this.openId= this.$store.getters['GET_OPENID'];
              console.log('---getWorkTypeAction---',this.openId);
              return this.openId;
          },
      },
    methods: {
    },
    mounted: function () {
        let ths = this;
        ths.$api.get('em/info',{openid:ths.getOpenId}).then((rets)=>{
            console.log('---rets',rets)
            if(rets.status === 'OK'){
                ths.form = rets.data;
            }
        })
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
