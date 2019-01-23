<template>
  <div class="register" :style="'height:'+pageHeight+'px'">
  <div class="register-title">个人信息</div>
    <form  action="javascript:void(0)">
      <mt-field label="用户名" placeholder="请输入用户名" v-model="form.name"></mt-field>
      <mt-cell title="性别" class="sex-content">
        <div class="male">
          <input type="radio" id="male" value ="1" name="sex" checked  @click="isCheck(1)"/>
          <label for="male">男</label>
        </div>
        <div class="female">
          <input type="radio" id="female" value ="0" name="sex" @click="isCheck(0)"/>
          <label for="female">女</label>
        </div>
      </mt-cell>
      <mt-cell title="民族" class="special-title"
               @click.native="changeNationOpen">
        <mt-field placeholder="请选民族"
                  v-model="form.nationText"
                  :disabled="true"></mt-field>
      </mt-cell>
      <mt-field label="手机号" placeholder="请输入手机号"  v-model="form.phone"></mt-field>

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
        <div class="camera-bg" @click="photoAction(1)">
          <img src="../assets/image/icon-camera.png" v-if="form.frontId ==''" >
          <img :src="form.frontImg" alt="" v-else >
          <div class="camera-title">身份证正面照</div>
        </div>
        <div class="camera-bg" @click="photoAction(2)">
          <img src="../assets/image/icon-camera.png" v-if="form.backId ==''" >
          <img :src="form.backImg" alt="" v-else >
          <div class="camera-title">身份证反面照</div>
        </div>
        <div class="camera-bg" @click="photoAction(3)">
          <img src="../assets/image/icon-camera.png" v-if="form.selfId ==''" >
          <img :src="form.selfImg" alt="" v-else >
        <div class="camera-title">本人照片</div>
      </div>
      </div>
      <mt-field label="验证码" v-model="form.captcha"  placeholder="请输入验证码" class="captcha">
        <mt-button type="primary" :disabled ='isDisabled'  @click.native='sendCode'>{{codeText}}</mt-button>
      </mt-field>
    </form>
    <div class="register-title">行业信息</div>
    <form action="javascript:void(0)">
      <mt-cell title="工作单位" class="special-title" @click.native ='openMerchant'  is-link >
        <mt-field  placeholder="请选择商户信息"  v-model="form.businessText" :disabled="true"></mt-field>
      </mt-cell>
      <mt-field label="单位地址" v-model="form.workUnit" :disabled="true"></mt-field>
      <mt-field label="所属行业" v-model="form.industry" :disabled="true"></mt-field>
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
        <mt-button type="primary" size="large" @click.native="toBuy">购买教材</mt-button>
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
                     :listArr="getWorkTypeAction"> </cui-attr-picker>
    <cui-attr-picker ref="changeNationPicker"
                     @confirm="nationChange"
                     :listArr="getNationAction"> </cui-attr-picker>
    <cui-attr-picker ref="changeMerchantPicker"
                     @confirm="merchantChange"
                     :listArr="getMermberAction"> </cui-attr-picker>


    <cui-address-child
      ref="addressPicker"
      @getLinkAddress='handleChange'
      v-show="showAddress"></cui-address-child>
  </div>
</template>
<script>
  import { mapState, mapMutations , mapGetters} from 'vuex';
  export default {
    data() {
      return {
        pageHeight:0,
        codeText:'发送验证码',
        isDisabled:false,
        form:{
          username:'',
          sex:1,
          nation:'',
          nationText:'',
          phone:'',
          captcha:'',
          address:'',
          detailAddr:'',
          urgencyPerson:'',
          urgencyPersonTel:'',
          IDCard:'',
          workType:'',
          workTypeCode:'',
          workUnit:'',
          industry:'',
          businessText:'',
          businessCode:'',
          frontId:'',
          frontImg:'',
          backId:'',
          backImg:'',
          selfId:'',
          selfImg:''
        },
        isShow:false,
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
        workTypeAction:[],
        nationAction:[],
        merchantAction:[],
        timer:120,
        openid:''
      };
    },
    computed: {
        ...mapState([
            'WORK_TYPE',
            'NATION',
            'MEMBER_LIST',

        ]),
        ...mapGetters([
            'GET_WORK_TYPE',
            'GET_NATION',
            'GET_MEMBER_LIST'
        ]),
        getWorkTypeAction(){
                this.workTypeAction= this.$store.getters['GET_WORK_TYPE'];
                console.log('---getWorkTypeAction---',this.workTypeAction);
                return this.workTypeAction;
        },
        getNationAction(){
                this.nationAction = this.$store.getters['GET_NATION'];
                console.log('---getNationAction---', this.nationAction)
                return this.nationAction;
        },
        getMermberAction(){
                this.merchantAction = this.$store.getters['GET_MEMBER_LIST'];
                console.log('---getMermberAction---',  this.merchantAction)
                return this.merchantAction;
        }
    },
    methods: {
        ...mapMutations(['COMMIT_WORK_TYPE','COMMIT_NATION','COMMIT_MEMBER_LIST']),
        isCheck(v){
            this.form.sex = v;
        } ,
        subInfo(){
          console.log(this.form)
            let ths = this;
          let saveForm = {
                "frontId":ths.form['frontId'],
                "backId":ths.form['backId'],
                "selfId":ths.form['selfId'],
                "user.name":ths.form['name'],
                "user.gender":ths.form['sex'],
                "user.phone":ths.form['phone'],
                "user.nation":ths.form['nation'],
                "user.province":ths.form['province'],
                "user.city":ths.form['city'],
                "user.address":ths.form['detailAddr'],
                "user.contact_name":ths.form['urgencyPerson'],
                "user.contact_phone":ths.form['urgencyPersonTel'],
                "user.job_id":ths.form['workTypeCode'],
                "user.job_name":ths.form['workType'],
                "user.credit":ths.form['IDCard'],
                "user.mer_id":ths.form['businessCode'],
                "openid":ths.openid,
                "smsCode":ths.form['captcha'],
            };
            if(!ths.form['name']){
              ths.$mint.Toast({
                  message:'用户名不能为空',
                  position:'center'
              });
                return false;
            }

            if(!ths.form['nation']){
                ths.$mint.Toast({
                    message:'民族不能为空',
                    position:'center'
                });
                return false;
            }

            let regPhone =/^1[34578]\d{9}$/;
            if(!regPhone.test(ths.form['phone'])){
                ths.$mint.Toast({
                    message:'手机号输入有误',
                    position:'center'
                });
                return false;
            }
            if(!ths.form['phone']){
                ths.$mint.Toast({
                    message:'手机号不能为空',
                    position:'center'
                });
                return false;
            }

            if(!ths.form['captcha']){
                ths.$mint.Toast({
                    message:'验证码不能为空',
                    position:'center'
                });
                return false;
            }

            if(!ths.form['address']){
                ths.$mint.Toast({
                    message:'户籍地址不能为空',
                    position:'center'
                });
                return false;
            }
            if(!ths.form['detailAddr']){
                ths.$mint.Toast({
                    message:'详细地址不能为空',
                    position:'center'
                });
                return false;
            }
            if(!ths.form['urgencyPerson']){
                ths.$mint.Toast({
                    message:'紧急联系人不能为空',
                    position:'center'
                });
                return false;
            }
            if(!ths.form['urgencyPersonTel']){
                ths.$mint.Toast({
                    message:'紧急联系人电话不能为空',
                    position:'center'
                });
                return false;
            }
            if(!regPhone.test(ths.form['urgencyPersonTel'])){
                ths.$mint.Toast({
                    message:'手机号输入有误',
                    position:'center'
                });
                return false;
            }

            if(!ths.form['workType']){
                ths.$mint.Toast({
                    message:'工种不能为空',
                    position:'center'
                });
                return false;
            }
            if(!ths.form['IDCard']){
                ths.$mint.Toast({
                    message:'身份证号码不能为空',
                    position:'center'
                });
                return false;
            }

            let regIdNo = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            if(!regIdNo.test(ths.form['IDCard'])){
                ths.$mint.Toast({
                    message:'身份证号填写有误',
                    position:'center'
                });
                return false;
            }
            if(!ths.form['frontId'] || !ths.form['backId'] || !ths.form['selfId']){
                ths.$mint.Toast({
                    message:'照片不能为空',
                    position:'center'
                });
                return false;
            }
            if(!ths.form['businessCode']){
                ths.$mint.Toast({
                    message:'商户信息不能为空',
                    position:'center'
                });
                return false;
            }
            ths.$api.post('em/save',saveForm).then((rets)=>{
              console.log(rets)
                if(rets.status === 'OK'){
                    ths.$router.push({'path':'registerNote'})
                }else{
                    ths.$mint.Toast({
                        message:rets.message,
                        position:'center'
                    })
                }
            })
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
        toBuy(){
            this.$router.push({'path':'/BuyTextBook'})
          } ,
        openWorkType(){
          this.$refs.changeWorkTypePicker.open()
        },
        workTypeChange(picker,value){
          console.log(picker,value)
          this.form.workType =picker;
          this.form.workTypeCode= value
        },
        openMerchant(){
            this.$refs.changeMerchantPicker.open()
        },
        merchantChange(picker,value){
            let ths = this;
            ths.form.businessText = picker;
            ths.form.businessCode = value;
            ths.$api.get('mer/detail',{id:value}).then((ret)=>{
                console.log("----",ret)
                if(ret.status === 'OK'){
                    ths.form.workUnit = ret.data[0].address;
                    ths.form.industry = ret.data[0].industry;
                    console.log(ths.form.workUnit ,ths.form.industry )
                }
            })
        },
        changeCity:function () {
          this.showAddress = true;
        },
        handleChange: function (picker) {
            console.log('handleChange-----',picker)
          if(picker){
                if(picker.province){
                  this.form.province = picker.province.code;
                }
                if(picker.city){
                    this.form.city = picker.city.code;
                }
                if(picker.area){
                    this.form.area = picker.area.code;
                }
            this.form.address = picker.province.name +"-"+picker.city.name+"-"+picker.area.name
          }
          this.showAddress = false;

        },
        changeNationOpen(){
          this.$refs.changeNationPicker.open()
        },
        nationChange(picker,value){
            console.log(picker,value)
          this.form.nationText = picker;
          this.form.nation =value;
        },
        sendCode(){
            let ts = this;
            console.log(ts.form.phone)
            if(ts.form.phone){
              let t = window.setInterval(()=>{
                  let ts = this;
                  ts.isDisabled = true;
                  ts.timer = --ts.timer  ;
                  console.log(ts.timer)
                  ts.codeText = ts.timer+'s后发送';
                  if(ts.timer<=0){
                      window.clearInterval(t);
                      ts.codeText = '重新发送';
                      ts.isDisabled=false;
                      ts.timer =120;
                  }
              },1000);
              ts.$api.get('sms/code',{phone:ts.form.phone}).then((rets)=>{
                  console.log('验证码code---',rets)
                  if(rets.status == 'Ok'){
                      ts.$mint.Toast({
                          message:rets.message,
                          position:'center'
                      })
                  }

              })
            }else{
                ts.$mint.Toast({
                    message:'手机号码不能为空',
                    position:'center'
                })
            }
        },
        photoAction(flag){
          let ts = this;
          wx.ready(function () {
              wx.chooseImage({
                  debugger:false,
                  count: 1, // 默认2
                  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                  sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                  success: function (res1) {
                      let localIds = res1.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                      wx.uploadImage({
                          localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
                          isShowProgressTips: 1, // 默认为1，显示进度提示
                          success: function (res2) {
                              let serverId = res2.serverId; // 返回图片的服务器端ID
                              wx.downloadImage({
                                  serverId: serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                                  isShowProgressTips: 1, // 默认为1，显示进度提示
                                  success: function (res3) {
                                      wx.getLocalImgData({
                                          localId: res3.localId.toString(), // 图片的localID
                                          success: function (res4) {
                                              let imgParams={
                                                  business:'em_attachment',
                                                  type:flag,
                                                  image:res4.localData
                                              };
                                              ts.$api.post('em/upload',imgParams).then((rets)=>{
                                                  let uploadData = rets.data;
                                                  if(rets.status ==='OK'){
                                                      let u = navigator.userAgent;
                                                      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                                                      // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                                                      if(isAndroid){
                                                          switch (flag){
                                                              case 1:
                                                                  ts.form.frontImg='data:image/png;base64,'+res4.localData;
                                                                  break;
                                                              case 2:
                                                                  ts.form.backImg='data:image/png;base64,'+res4.localData;
                                                                  break;
                                                              case 3:
                                                                  ts.form.selfImg='data:image/png;base64,'+res4.localData;
                                                                  break;
                                                          }
                                                        //  ts.imgList.push('data:image/png;base64,'+res4.localData)
                                                      }else{
                                                          switch (flag){
                                                              case 1:
                                                                  ts.form.frontImg=res4.localData;
                                                                  break;
                                                              case 2:
                                                                  ts.form.backImg=res4.localData;
                                                                  break;
                                                              case 3:
                                                                  ts.form.selfImg=res4.localData;
                                                                  break;
                                                          }
                                                         // ts.imgList.push(res4.localData)
                                                      }
                                                      switch(flag){
                                                          case 1:
                                                              ts.form['frontId'] =uploadData.imageid;
                                                              break;
                                                          case 2:
                                                              ts.form['backId'] =uploadData.imageid;
                                                              break;
                                                          case 3:
                                                              ts.form['selfId'] =uploadData.imageid;
                                                              break;
                                                      }

                                                  }else{
                                                      ts.$mint.Toast({
                                                          message:rets.message,
                                                          position:'center'
                                                      })
                                                  }
                                              })
                                          }
                                      });
                                  },
                                  fail:function (error) {
                                      alert('error--'+error)
                                      ts.$mint.Toast({
                                          message:'上传图片失败',
                                          position:'center'})
                                      console.log('error---',error)
                                  }
                              });
                          }
                      });
                  }
              });
          })
      }
    },
    created(){
        let ths = this;
        ths.pageHeight = document.body.clientHeight;
    },
    mounted: function () {

        let ts = this;
        let href = window.location.href;
        console.log('href-----',href)
        console.log(href.split('?'))
        let localHref =href.split('#')[0];
        let temp =href.split('#')[1];
         ts.openid = temp.substring(temp.indexOf('=')+1,temp.indexOf('&'));
         ts.$store.commit('SET_OPENID',ts.openid);
        let Status =temp.substring(temp.indexOf('status=')+7)

        switch (Status){
            case '0':
                ts.$api.get('wx/jsconfig',{url:localHref}).then((rets)=>{
                    if(rets.status === 'OK'){
                        console.log('rets---',rets.data)
                        let data = rets.data;
                        wx.config({
                            appId:data.appId,
                            timestamp: data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                            signature: data.signature,// 必填，签名
                            jsApiList: ['chooseImage','uploadImage','downloadImage','getLocalImgData'],
                            success:function (res) {
                                if (res.checkResult.getLocation == false) {
                                    ts.$mint.Toast({
                                        message:'你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！',
                                        position:'center'
                                    });
                                    return;
                                }
                            },
                            error:function(res){

                            }
                        })
                    }else{
                        ts.$mint.Toast({
                            message:rets.message,
                            position:'center'
                        })
                    }
                });
                break;
            case '1':
                ts.$router.push({'path':'/registerNote'});
            case '2':
                break;
            case '3':
                break;
            case '4':
                ts.$router.push({'path':'/registerInfo',query:{status:Status}});
                break;
        }
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
        width: 180px;
        height: 120px;
        margin: 0 auto 50px;
        text-align: center;
        .camera-title{
          padding: 5px ;
          font-size: 13px;/*no*/
          margin-bottom: 10px;
        }
      }
      img{
        width: 100% ;
        height: 100%;
      }
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
