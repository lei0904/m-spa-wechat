<template>
    <div class="training-index">
        <div class="training-content">
            <div class="item" @click="toPage(1)">
                <i class="icon  icon-exercise"></i>
                <div>培训练习</div>
            </div>
            <div class="item" @click="toPage(2)">
                <i class="icon  icon-mistakes"></i>
                <div>我的错题</div>
            </div>
            <div class="item" @click="toPage(3)">
                <i class="icon  icon-collect"></i>
                <div>我的收藏</div>
            </div>
            <div class="item" @click="toPage(4)">
                <i class="icon  icon-attachment"></i>
                <div>培训讲义</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        methods: {
            toPage(flag){
                switch (flag){
                    case 1:
                        this.$router.push({'path':'/trainingExam'});
                        break;
                    case 2:
                        this.$router.push({'path':'/trainingExam',query:{model:1}});
                        break;
                    case 3:
                        this.$router.push({'path':'/trainingExam',query:{model:2}});
                    break;
                    case 4:
                        this.$router.push({'path':'/attachment'});
                        break;
                }
            }
        },
        mounted: function () {
            let ths = this;
            let str = window.location.href;
            console.log('str---',str.split("?"))
            let _tempStr ="",_temp =[];
            let openid='';
            if(str.split("?").length>1){
                _tempStr = str.split("?")["1"];
                _temp =_tempStr.split('&');
                openid =  _temp[0].substr(7);
            }
            ths.$store.commit('SET_OPENID',openid);
        }
    }

</script>

<style lang="scss">
    .training-index{
        .training-content{
            display: flex;
            flex-wrap: wrap;
            width: 360px;
            margin: auto;
            padding: 30px 10px;
            .item{
                justify-content: flex-start;
                margin-right: 10px;
                margin-bottom: 10px;
                background: #fff;
                border-radius: 5px;
                height: 80px;
                width: 80px;
                text-align: center;
                font-size: 13px;/*no*/
                color: #1296db;
                .icon{
                    width: 50px;
                    height: 50px;
                    display: block;
                    margin: auto;
                }
                .icon-exercise{
                    background: url("../assets/image/icon-exercise.png");
                    background-repeat: no-repeat;
                    background-size: 35px 35px;
                    background-position: center center;
                }
                .icon-mistakes{
                    background: url("../assets/image/icon-mistakes.png");
                    background-repeat: no-repeat;
                    background-size: 35px 35px;
                    background-position: center center;
                }
                .icon-collect{
                    background: url("../assets/image/icon-collect.png");
                    background-repeat: no-repeat;
                    background-size: 35px 35px;
                    background-position: center center;
                }
                .icon-attachment{
                    background: url("../assets/image/icon-attachment.png");
                    background-repeat: no-repeat;
                    background-size: 35px 35px;
                    background-position: center center;
                }
            }
            .item:active{
                background: rgba(255,255,255,0.6);
            }
        }

    }

</style>
