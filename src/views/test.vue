<template>
    <div class="test">
        测试页面
        <mt-cell>
            <mt-field label="用户名"
                      placeholder="请输入用户名"
                      v-model="username"
            ></mt-field>
            <mt-button  @click="handleCommentFocus" class="test-btn">校验</mt-button>
        </mt-cell>
        <mt-button @click.native="pay">支付</mt-button>
        <div class="word-frame">

        </div>

        <cui-attr-picker ref="changeMerchantPicker"
                         @confirm="merchantChange"
                         :popupVisible="false"
                         :listArr="merchantAction"> </cui-attr-picker>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                username:'',
                merchantAction:[],
                testAction:[
                    {name:'测试1',code:'1'},
                    {name:'测试好2',code:'2'},
                    {name:'测试3',code:'3'},
                    {name:'测4',code:'4'}
                ]
            };
        },
        methods: {
            handleCommentFocus(){
                this.$refs.changeMerchantPicker.open();
                if(this.username){
                   let reg = new RegExp(this.username)
                   let tempArr= this.testAction.filter(k => reg.test(k.name))
                   this.merchantAction = tempArr

                }else{
                    this.merchantAction = this.testAction;
                }
            },
            openMerchant(){
                this.$refs.changeMerchantPicker.open()
            },
            merchantChange(picker,value){
                    console.log(picker,value)

                this.username = picker;
            },
            pay(){
                let ths = this;
                let params ={
                    id:'77336faac09548dd8b1637ab3de8a262'
                }
                ths.$api.post('wx/pay',params).then((ret)=>{
                    eval(ret);
                })
            }
        },
        mounted: function () {
            this.merchantAction = this.testAction;
        }
    }

</script>

<style lang="scss">
    .test{
        .test-btn{
            width: 120px;
        }
    }
</style>
