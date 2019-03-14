<template>
 <div class="attachment">
     <div class="attach-content" >
        <div class="item"
             v-for ='item in imgList'
             @click="downloadAttach(item.id)">{{item.name}}</div>
     </div>

 </div>
</template>
<script>
    import Api from '../api/api.js'
    export default {
        data() {
            return {
                openid:'',
                baseRoot:Api.getRoot(),
                imgList:[]
            };
        },

        methods: {
            downloadAttach(id){
               window.location=this.baseRoot+'attachment/download?id='+id;
            }
        },
        mounted: function () {
            let ths = this;
            ths.openid = ths.$store.getters['GET_OPENID']
            ths.$api.get('attachment/list',{openid: ths.openid }).then((rets)=>{
                console.log('------>attachment',rets);
                ths.imgList = rets.data;
            })
        }
    }

</script>

<style lang="scss">
    .attachment{
        .attach-content{
            margin: 20px auto;
            .item{
                padding: 5px 20px;
                font-size: 18px/*no*/;
                color: #26a2ff;
            }

        }
    }

</style>
