<template>
    <div class="register-info" :style="'height:'+pageHeight+'px'">
        <div class="register-title">个人信息</div>
        <form  action="javascript:void(0)">
            <mt-cell title="姓名"  v-model="form.name"></mt-cell>
            <mt-cell title="性别">
             <span v-if="form.gender == '1'">男</span>
             <span v-else>女</span>
            </mt-cell>
            <mt-cell title="民族" v-model="form.nation_name"></mt-cell>
            <mt-cell title="手机号" v-model="form.phone"></mt-cell>
            <mt-cell title="户籍地区" v-model="form.household" :disabled=true></mt-cell>
            <mt-cell title="户籍详细地址"   v-model="form.address"></mt-cell>
            <mt-cell title="本市地区" v-model="form.liveaddress" :disabled=true></mt-cell>
            <mt-cell title="本市详细地址"   v-model="form.current_address"></mt-cell>
            <mt-cell title="紧急联系人"  v-model="form.contact_name"></mt-cell>
            <mt-cell title="紧急联系号码" v-model="form.contact_phone"></mt-cell>
            <mt-cell title="工种" v-model="form.job_name"></mt-cell>
        </form>
        <div class="register-title">行业信息</div>
        <form action="javascript:void(0)">
            <mt-cell title="工作单位"  v-model="form.mer_name" ></mt-cell>
            <mt-cell title="单位地址" v-model="form.mer_address" :disabled="true"></mt-cell>
            <mt-cell title="所属行业" v-model="form.industry" :disabled="true"></mt-cell>
        </form>
        <div class="trainForm">
            <div class="register-title">培训信息</div>
            <form action="avascript:void(0)" >
                <mt-cell title="状态" >
                     <span v-if="Status == 1">待认证</span>
                     <span v-if="Status == 2">待付款</span>
                     <span v-if="Status == 3">培训中</span>
                    <span  v-if="Status == 4">已通过</span>
                    <span  v-if="Status == 5">已发卡</span>
                </mt-cell>
                <mt-cell title="我的订单"  @click.native="toOrder"  is-link ></mt-cell>
            </form>
            <div class="btn-content" v-if="isDisabled">
                <mt-button type="primary" size="large" @click.native="toBuy">购买教材</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState, mapMutations , mapGetters} from 'vuex';
    export default {
        data() {
            return {
                pageHeight:0,
                isDisabled:false,
                form:{
                    username:'',
                    gender:'1',
                    nation_name:'',
                    phone:'',
                    address:'',
                    household:'',
                    contact_name:'',
                    contact_phone:'',
                    mer_name:'',
                    mer_address:'',
                    job_name:'',
                    industry:'',
                    liveaddress:'',
                    current_address:''
                },
                isShow:false,
                showAddress:false,
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
                openid:'',
                Status:0
            };
        },
        computed: {
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
            toOrder(){
                this.$router.push({'path':'/order'})
            },
            toBuy(){
                let ths =this;
                let openid = ths.$store.getters['GET_OPENID'];
                ths.$api.get('wx/order',{openid:openid}).then((ret)=>{
                    console.log('wx/order----',ret)
                    if(ret.status === 'OK'){
                        this.$router.push({'path':'/BuyTextBook',query:ret.data})
                    }else{
                        ths.$mint.Toast({
                            message:ret.message,
                            position:'center'
                        })
                    }
                });
            } ,
            toPay(){

            }
        },
        created(){
            let ths = this;
            ths.pageHeight = document.body.clientHeight;
        },
        mounted: function () {
            let ths = this;
            ths.Status = ths.$route.query.status;
            console.log('----Status', ths.Status)
            if(ths.Status == 2){
                ths.isDisabled = true;
            }
            ths.$api.get('em/info',{openid:ths.getOpenId}).then((rets)=>{
                console.log('---rets',rets)
                if(rets.status === 'OK'){
                    ths.form = rets.data;
                    ths.$api.get('mer/detail',{id:ths.form.mer_id}).then((ret)=>{
                        if(ret.status === 'OK'){
                            console.log('----industry----',ret.data)
                            //ths.form.industry= ret.data[0].industry;
                            ths.$set(ths.form,'industry',ret.data[0].industry)
                            console.log('----industry----',ths.form)
                        }
                    })
                }
            })
        }
    }

</script>

<style lang="scss">
    .register-info{
        overflow-y: scroll;
        .mint-cell-text {
            vertical-align: middle;
            min-width: 110px;
            display: inline-block;
        }
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
