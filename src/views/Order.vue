<template>
  <div class="order">
    <div class="order-content">
      <div
        :v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="loading"
        :infinite-scroll-distance="10"
        :infinite-scroll-immediate-check = "false"
        class="order-list-wrap"
        :style="{ height: pageHeight + 'px' }"
      >
        <div v-for="item in list" class="item" @click="orderDetail(item)">
          <div class="item-content">{{item.mer_name}}</div>
          <div class="price">¥{{item.money/100|fmtMoney}}</div>
          <div class="list-status" >
            <span  class="unpaid" v-if="item.status == 0">待支付</span>
            <span class="paid" v-if="item.status == 1">已支付</span>
            <span  class="unpaid" v-if="item.status == 2">支付失败</span>
          </div>
        </div>
        <div class="list-empty" v-if="!list.length">
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
  import filter from  '../components/Filters/filters'
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
    filters:filter,
    methods: {
      loadMore() {
          let ths = this;
          ths.loading = true;
          let openid = ths.$store.getters['GET_OPENID'];
          ths.$api.get('wx/orderList',{openid:openid}).then((ret)=>{
              ths.loading = false;
              console.log('ret---',ret)
              if(ret.status === 'OK'){
                  ths.list = ret.data;
              }else{
                  ths.$mint.Toast({
                      message:ret.message,
                      position:'center'
                  })
              }
          })
      },
      orderDetail(item){
          console.log('item---',item)
          if(item.status == 0){
              this.$router.push({'path':'/buyTextBook',query:item})
          }
      }
    },
    mounted: function () {
      this.pageHeight = document.body.clientHeight;
      this.loadMore()

    }
  }

</script>

<style lang="scss">
  .order{
    .order-content{
      overflow-y: scroll;
      .order-list-wrap{
        overflow-y: scroll;
        .item{
          display: flex;
          justify-content: space-between;
          align-items: center;
          min-height: 35px;
          padding: 10px 20px;
          font-size: 13px;/*no*/
          border-bottom: 1px solid #d8d8d8;
          background: #fff;
          .item-content{
            flex: 1;
          }
          .price{
            color: #ffb217;
            width: 100px;
            text-align: center;
            font-size: 16px;/*no*/
          }
          .list-status{
            width: 80px;
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
