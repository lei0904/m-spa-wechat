<template>
    <div class="buyTextbook" >
        <div class="order-info" :style="{height:contentHeight+'px'}">
            <div class="order-title">订单信息</div>
            <div class="order-content">{{info.merchant}}</div>
            <div class="item teach-cycle">
                <label>培训期</label>
                <span>不限次数</span>
            </div>
            <div class="item exam-times">
                <label>考试次数</label>
                <span>不限次数</span>
            </div>
        </div>
        <div class="pay-content">
            <div class="pay-infos">
                <div class="total"><span>总计:</span><span class="price">¥{{info.money/100| fmtMoney }}</span></div>
                <div class="infos"></div>
            </div>
            <div class="pay-btn" @click="toPay">确认支付</div>
        </div>
    </div>
</template>
<script>
    import filter from  '../components/Filters/filters'
    export default {
        data() {
            return {
                contentHeight:0,
                info:{}
            };
        },

        filters:filter,
        methods: {
            toPay(){
                let ths = this;
                let params ={
                    id:ths.info.orderId
                }
                ths.$api.post('wx/pay',params).then((ret)=>{
                    eval(ret);
                })
            }
        },
        mounted: function () {
            let  ths = this;
            ths.contentHeight = document.body.clientHeight - 185;
            console.log('----query',ths.$route.query)

            let openid = ths.$store.getters['GET_OPENID'];
            let _tempData = ths.$route.query;
            let params = {
                openid:openid,
                orderId:_tempData.id||_tempData.orderId
            }
            ths.$api.get('wx/orderDetail',params).then((ret)=>{
                if(ret.status === 'OK'){
                    ths.info = ret.data;
                }else{
                    ths.$mint.Toast({
                        message:ret.message,
                        position:'center'
                    })
                }
            })

        }
    }

</script>

<style lang="scss">
    .buyTextbook{
        background: #fff;
        .order-info{
            padding: 10px;
            font-size: 14px;/*no*/
            .order-title{
                font-size: 16px;/*no*/
                margin: 20px 0 10px 0;
            }
            .order-content{
                font-size: 14px;/*no*/
                padding: 10px;
                text-indent: 30px;
            }
            .item{
                padding: 10px 0;
                border-bottom: 1px solid #d8d8d8;/*no*/
                label{
                    width: 105px;
                    text-align: left;
                    display: inline-block;
                }
            }
            .teach-cycle{

            }

        }
        .pay-content{
            display: flex;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 85px;
            font-size: 12px;/*no*/
            background: #fff;
            justify-content: space-between;
            .pay-infos{
                flex: 1;
                padding: 10px;
                .total{
                    font-size: 20px;/*no*/
                    height: 85px;
                    line-height: 85px;
                    .price{
                        padding-left: 5px;
                        color: #ffb217;
                    }
                }
                .infos{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
            .pay-btn{
                width: 140px;
                height: 85px;
                line-height: 85px;
                padding:0 10px;
                text-align: center;
                color: #fff;
                background: #26a2ff;
                font-size: 20px;/*no*/
                box-sizing: border-box;
            }
            .pay-btn:active{
                background: #0d8bff;
            }
        }
    }

</style>
