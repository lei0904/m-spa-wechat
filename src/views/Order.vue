<template>
  <div class="order">
    <div class="order-content">
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
        class="order-list-wrap"
        :style="{ height: pageHeight + 'px' }"
      >
        <div v-for="item in list" class="item" @click="orderDetail(item)">
          <div class="item-content">{{item.content}}</div>
          <div class="price">¥{{item.price}}</div>
          <div class="list-status" >
            <span  class="unpaid" v-if="item.status == 0">待支付</span>
            <span class="paid" v-else>已支付</span>
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
        this.loading = true;
        setTimeout(() => {
            console.log('----')
        //  let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
               let params = {
                   content:'酒吧行业从业人员培训',
                   price:'200',
                   status:Math.floor(Math.random()*2)
               }
            this.list.push(params);
          }
          this.loading = false;
        }, 2500);
      },
      orderDetail(item){
          if(item.status == 0){
              this.$router.push({'path':'/buyTextBook'})
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
