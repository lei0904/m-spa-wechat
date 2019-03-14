<template>
    <div class="exam-record">
        <div class="exam-content">
            <div
                    v-infinite-scroll="loadMore"
                    :infinite-scroll-disabled="loading"
                    :infinite-scroll-distance="10"
                    :infinite-scroll-immediate-check = "false"
                    class="exam-list-wrap"
                    :style="{ height: pageHeight + 'px' }"
            >
                <div v-for="item in list" class="item" >
                    <div class="item-content">{{item.exam_date}}</div>
                    <div class="price">{{item.total||0}}分</div>
                    <div class="list-status" >
                        <span  class="paid" v-if="item.result == 1">通过</span>
                        <span class="unpaid" v-else>未通过</span>
                    </div>
                </div>
                <div class="list-empty" v-if="!list.length && !loading">
                    <i></i>
                    <p>暂无数据</p>
                </div>
                <p v-show="loading" class="loading-content">
                    <mt-spinner type="fading-circle"></mt-spinner>
                    加载中...
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list:[],
                start:1,
                allLoad:false,
                loading:false,
                pageHeight:0,
            };
        },
        methods: {
            loadMore() {
                let ths = this;
                ths.loading = true;
                let openid = ths.$store.getters['GET_OPENID']
                ths.$api.get('check/results',{openid:openid}).then((rets)=>{
                        console.log('results----',rets)
                    ths.list = rets.data;
                    ths.loading = false;
                })
            },
//            orderDetail(item){
//                if(item.status == 0){
//                    this.$router.push({'path':'/buyTextBook'})
//                }
//            }
        },
        mounted: function () {
            this.pageHeight = document.body.clientHeight;
            this.loadMore()

        }
    }

</script>

<style lang="scss">
    .exam-record{
        .exam-content{
            overflow-y: scroll;
            .exam-list-wrap{
                overflow-y: scroll;
                .item{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    min-height: 35px;
                    padding: 10px 20px;
                    font-size: 13px;/*no*/
                    border-bottom: 1px solid #d8d8d8;/*no*/
                    background: #fff;
                    .item-content{
                        flex: 1;
                    }
                    .price{
                        color: #ffb217;
                        flex: 1;
                        font-size: 16px;/*no*/
                    }
                    .list-status{
                        width: 50px;
                        text-align: right;
                        font-size: 16px;/*no*/
                        .unpaid{
                            color: #ff4c1e;
                        }
                        .paid{
                            color: #26a2ff;
                        }
                    }

                }

            }
            .list-empty{
                text-align: center;
                font-size: 14px;/*no*/
            }
            .mint-spinner-fading-circle{
                margin:10px auto;
            }
            .loading-content{
                text-align: center;
                font-size: 12px;/*no*/
            }
        }
    }
</style>
