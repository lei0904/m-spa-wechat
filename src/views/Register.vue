<template>
  <div class="register" :style="'height:'+pageHeight+'px'">
  <div class="register-title">个人信息</div>
    <form  action="javascript:void(0)">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="form.username"></mt-field>
      <mt-cell title="性别" class="sex-content">
      <!--  <label for="male" class="sex-item"><input name="sex" id="male" type="radio" value="" checked />男 </label>
        <label for="female" class="sex-item"><input name="sex" id="female"  type="radio" value=""/>女 </label>-->

        <div class="male">
          <input type="radio" id="male" name="sex" checked/>
          <label for="male">男</label>
        </div>
        <div class="female">
          <input type="radio" id="female" name="sex" />
          <label for="female">女</label>
        </div>
      </mt-cell>
      <mt-field label="民族" placeholder="请选民族"  v-model="form.nation"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号"  v-model="form.phone"></mt-field>
      <mt-field label="验证码" v-model="form.captcha"  placeholder="请输入验证码" class="captcha">
        <mt-button type="primary">发送验证码</mt-button>
      </mt-field>
      <mt-field label="户籍地址" placeholder="请选择户籍地址"
                v-model="form.address"
                @click.native="changeCity"
                :disabled=true>

      </mt-field>
      <mt-field label="详细地址" placeholder="请输入详细地址"  v-model="form.detailAddr"></mt-field>
      <mt-field label="紧急联系人" placeholder="请输入紧急联系人"  v-model="form.urgencyPerson"></mt-field>
      <mt-field label="紧急联系号码" placeholder="请输入紧急联系人号码"  v-model="form.urgencyPersonTel"></mt-field>
      <mt-cell title="工种" is-link class="special-title" @click.native="openWorkType">
        <mt-field  placeholder="请选择工种"  v-model="form.workType" :disabled="true"></mt-field>
      </mt-cell>
      <mt-field label="身份证号码" placeholder="请输入身份证号码"  v-model="form.IDCard"></mt-field>
      <div class="camera-content">
        <div class="camera-bg">
          <img src="../assets/image/icon-camera.png">
          <div class="camera-title">身份证正面照</div>
        </div>
        <div class="camera-bg">
          <img src="../assets/image/icon-camera.png">
          <div class="camera-title">身份证反面照</div>
        </div><div class="camera-bg">
        <img src="../assets/image/icon-camera.png">
        <div class="camera-title">本人照片</div>
      </div>
      </div>
    </form>
    <div class="register-title">行业信息</div>
    <form action="javascript:void(0)">
      <mt-cell title="工作单位" class="special-title"  is-link >
        <mt-field  placeholder="请选择工作单位"  v-model="form.workUnit" :disabled="true"></mt-field>
      </mt-cell>
      <mt-field label="单位地址"  placeholder="请选择工作单位"  v-model="form.workUnit" :disabled="true"></mt-field>
      <mt-field label="所属行业"  placeholder="请选择所属行业"  v-model="form.industry" :disabled="true"></mt-field>
    </form>

    <div class="trainForm" v-show="isShow">
      <div class="register-title">培训信息</div>
      <form action="avascript:void(0)" >
        <mt-cell title="状态" class="special-title"  @click.native="stateOpen"  is-link >
          <mt-field  placeholder="请选择工作单位"  v-model="stateText" :disabled="true"></mt-field>
        </mt-cell>
        <mt-cell title="我的订单"  @click.native="toOrder"  is-link ></mt-cell>
      </form>
      <div class="btn-content">
        <mt-button type="primary" size="large">购买教材</mt-button>
      </div>
    </div>
    <div class="btn-content" v-show="!isShow">
      <mt-button type="primary" size="large" @click="subInfo">提交</mt-button>
    </div>


    <cui-attr-picker ref="changeStatePicker"
                     @confirm="stateChange"
                     :listArr="stateAction"> </cui-attr-picker>
    <cui-attr-picker ref="changeWorkTypePicker"
                     @confirm="workTypeChange"
                     :listArr="workTypeAction"> </cui-attr-picker>

    <cui-address-child
      ref="addressPicker"
      @getLinkAddress='handleChange'
      v-show="showAddress"></cui-address-child>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        pageHeight:0,
        form:{
          username:'',
          sex:'',
          nation:'',
          phone:'',
          captcha:'',
          address:'',
          detailAddr:'',
          urgencyPerson:'',
          urgencyPersonTel:'',
          workType:'',
          IDCard:'',
          workUnit:'',
          industry:''
        },
        isShow:true,
        stateText:'',
        showAddress:false,
        trainForm:{
          state:'待付款'
        },
        stateAction:[
          {
            name:'待认证',
            code:'0'
          },
          {
            name:'待付款',
            code:'1'
          },
          {
            name:'培训中',
            code:'2'
          },
          {
            name:'考试通过',
            code:'3'
          },
          {
            name:'已发卡',
            code:'4'
          },
        ],
        workTypeAction:[
          {name:'厨师',code:'0'}
        ]

      };
    },
    methods: {
      subInfo(){
        this.$router.push({'path':'registerNote'})
      },
      stateChange(picker,value){
        console.log(picker,value)
        this.stateText =picker;
        this.trainForm.state= this.value
      },
      stateOpen(){
        this.$refs.changeStatePicker.open();
      },
      toOrder(){
        this.$router.push({'path':'/order'})
      },
      openWorkType(){
        this.$refs.changeWorkTypePicker.open()
      },
      workTypeChange(picker,value){
        console.log(picker,value)
        this.stateText =picker;
        this.trainForm.state= this.value
      },

      changeCity:function () {
        this.showAddress = true;
      },
      handleChange: function (picker) {
        if(picker){
          this.form.address = picker.province.name +"-"+picker.city.name+"-"+picker.area.name
        }
        this.showAddress = false;

      }
    },
    mounted: function () {
    this.pageHeight = document.body.clientHeight;
    }
  }

</script>

<style lang="scss">
  .register{
    overflow-y: scroll;
    .register-title{
      margin: 10px;
      font-size: 20px;/*no*/
    }
    .sex-content{
      .mint-cell-title{
        width: 105px;
        flex: none;
      }
      .sex-item{
        margin-right:20px;
        padding-right:20px;
      }
    }
    .captcha {
      .mint-button--normal{
        height: 35px ;
        line-height: 35px;
        margin: 10px auto;
        font-size: 12px;/*no*/
      }
    }
    .special-title{
    .mint-cell-title{
      width: 105px;
      flex:none;
      .mint-cell-wrapper{
        padding: 0;
        background-image: none;
      }
    }
  }
    .camera-content{
      background: #fff;
      margin: auto;
      border-top: 1px solid #d9d9d9;/*no*/
      padding: 10px;
      .camera-bg{
        width: 120px;
        height: 80px;
        margin: auto;
        text-align: center;
        .camera-title{
          padding: 5px ;
          font-size: 13px;/*no*/
        }
      }
      img{}
    }
    .btn-content{
      margin: 20px;
    }
    .female,.male{
      width: 68px;
    }
    input[type="radio"] + label::before {
      content: "\a0"; /*不换行空格*/
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;/*no*/
      width: 15px;
      height: 15px;
      margin-right: 10px;
      border-radius: 50%;
      border: 1px solid #26a2ff;/*no*/
      text-indent: 10px;
      line-height: 1;
    }
    input[type="radio"]:checked + label::before {
      background-color: #26a2ff;
      background-clip: content-box;
      padding: 5px;
      width: 5px;
      height: 5px;
    }
    input[type="radio"] {
      position: absolute;
      clip: rect(0, 0, 0, 0);
    }


  }

</style>
