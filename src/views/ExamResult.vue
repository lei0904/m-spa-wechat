<template>
    <div class="exam-result">
        <div class="result" :class="status == 0 ? 'no-pass':''" v-if="status == 0" >可惜啦,就差一点点!</div>
        <div class="result" :class="status == 1 ? 'pass':''" v-else >恭喜您!考试通过啦！</div>
        <div class="result-content">
            <div class="result-title">考试结果</div>
            <div class="question-totals">题目数量: <span class="totals">{{num}}</span></div>
            <div class="score">总得分: <span class="score-item">{{score}}</span></div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                status:Math.floor(Math.random()*2),
                result:'',
                num:50,
                score:100
            };
        },
        methods: {
        },
        mounted: function () {

        }
    }

</script>

<style lang="scss">
    .exam-result{
        background-color: #fff;
        .result{
            display: flex;
            height: 200px;
            align-items: center;
            text-align: center;
            justify-content: center;
            color: #1296db;
            box-sizing: border-box;
            padding-top: 40px;
            border-bottom: 1px solid #d8d8d8;/*no*/
            font-size: 16px;/*no*/
        }
        .no-pass{
            color: #ff587d;
            background-image:url("../assets/image/icon-no-pass.png");
            background-repeat: no-repeat;
            background-size: 68px 68px;
            background-position: center 30px;
        }
        .pass{
            background-image:url("../assets/image/icon-pass.png");
            background-repeat: no-repeat;
            background-size: 68px 68px;
            background-position: center 30px;
        }
        .result-content{
            padding: 20px 10px;
            font-size: 14px;/*no*/
            margin-bottom: 10px;
            .result-title{
                font-size: 20px;/*no*/
                margin-bottom: 10px;
            }
            .question-totals{
                font-size: 18px;/*no*/
                padding-left: 8px;
                margin-bottom: 5px;
                .totals{
                    color: #1296db;
                }

            }
            .score{
                font-size: 18px;/*no*/
                padding-left: 8px;
                margin-bottom: 5px;
                .score-item{
                    color: #ff587d;
                }
            }
        }

    }
</style>
