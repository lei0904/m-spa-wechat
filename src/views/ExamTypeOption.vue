<template>
    <div class="exam-type">
        <div class="exam-list">
            <div class="exam-item"
                 v-for ="item in typeData"
                 @click="toExams(item)"
            >
                <div class="name">{{item.name}}</div>
                <div class="remark">{{item.industry_name}}</div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
    .exam-type{
        .exam-list{
            display: flex;
            flex-wrap: wrap;
            font-size: 14px;/*no*/
            margin: 20px 10px;
            align-items: center;
            justify-content: flex-start;
            .exam-item{
                background-color: #fff;
                margin: 5px;
                padding: 15px 0;
                width: 78px;
                height: 88px;
                text-align: center;
                align-items: center;
                border-radius: 10px;
                box-sizing: border-box;
            }
            .exam-item:active{
                background-color: rgba(255,255,255,.5);
            }
        }
    }
</style>
<script>
    export default {
        data(){
            return {
                typeData:[]
            }
        },
        methods:{
            toExams(item){
                let ts = this;
                ts.$mint.MessageBox.confirm('是否确定开启考试?考试期间:' +
                    '<div style="text-align: left">a.不可打开培训学习页面</div>' +
                    '<div style="text-align: left">b.可以断线重连，显示剩余考试时间</div>',
                    '提示').then(function () {
                        console.log('item----',item)
                    ts.$store.commit('SetPaperInfo',item);
                    ts.$router.push({'path':'/exams'})
                })
            }
        },
        mounted(){
            let ths = this;
            let openid = ths.$store.getters['GET_OPENID'];
            console.log('openid---',openid)
            ths.$api.get('check/exams',{openid:openid}).then((rets)=>{
                if(rets.status =='OK'){
                    ths.typeData = rets.data;
                    console.log('typeData---',rets.data)
                }else{
                    ths.$mint.Toast({
                        message:rets.message,
                        position:'center'
                    })
                }
            })

        }
    }
</script>