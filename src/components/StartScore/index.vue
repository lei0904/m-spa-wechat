<template>
    <div>
        <slot>
            <div class="star" :class="starType">
                <em v-for="(itemClass,index) in itemClasses"
                    :class="itemClass"
                    @click='setScore(index+1)'
                    :value="index+1"
                    class="star-item" ></em>
            </div>
        </slot>
    </div>
</template>

<style lang="scss">
    .star{
        display:inline-block;
        background-repeat:no-repeat;
    }
    .star .star-item{
        width:25px;
        height:25px;
        margin-right:15px;
        display: inline-block;
        background-size:100% 100%;
    }

    .star .star-item:last-child{
        margin-right:0
    }

    .star .on{
        background-image:url('../../assets/image/star-full.png');
    }
    .star .half{
        background-image:url('../../assets/image/star-half-full.png');
    }
    .star .off{
        background-image:url('../../assets/image/star-empty.png');
    }

</style>
<script>
    let LENGTH = 5;
    let CLS_ON = 'on';
    let CLS_HALF = 'half';
    let CLS_OFF = 'off';
    export  default {
        name: 'start-score',
        props: {
            size: { //传入的size变量
                type: Number //设置变量类型
            },
            score: { //传入的score变量
                type: Number
            },
            read:{//是否可以评价
                type:Boolean
            }
        },
        watch:{
            scores:function (news,old) {
                this.oldScores = old;
            }
        },
        data(){
            return{
                scores:0,
                oldScores:0
            }
        },
        computed: {
            starType:function(){ //通过计算属性,返回组装过的类型,用来对应class类型

                return 'star-' + this.size;
            },
            itemClasses:function(){
                console.log("-----itemClasses")
                var result = []; //返回的是一个数组,用来遍历输出星星
                var score = 0;
                if(this.score){
                    score = Math.floor(this.score * 2) / 2; //计算所有星星的数量
                }
                var hasDecimal = score % 1 !== 0; //非整数星星判断
                var integer = Math.floor(score); //整数星星判断
                for (var i = 0; i < integer; i++) { //整数星星使用on
                    result.push(CLS_ON);//一个整数星星就push一个CLS_ON到数组
                }
                if (hasDecimal) { //非整数星星使用half
                    result.push(CLS_HALF);//类似
                }
                LENGTH = this.size;
                while (result.length < LENGTH) { //余下的用无星星补全,使用off
                    result.push(CLS_OFF);//类似
                }
                return result;
            }
        },
        methods:{
            setScore:function(v){
                console.log("read------",this.read);
                if(!this.read){
                    this.scores = v;
                    this.$emit('childScore',this.scores);
                }
            }
        },
        mounted(){

        }
    }

</script>
