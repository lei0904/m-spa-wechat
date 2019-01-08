<template>
  <div class="Order">
    <div class="order-content" :style="'height'+pageHeight+'px'">
      <ul
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
        <li v-for="item in list">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list:['1','2'],
        loading:true,
        pageHeight:0
      };
    },
    methods: {
      loadMore() {
        this.loading = true;
        setTimeout(() => {
          let last = this.list[this.list.length - 1];
          for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
          }
          this.loading = false;
        }, 2500);
      }
    },
    mounted: function () {
      this.pageHeight = document.body.clientHeight;
      //this.loadMore()

    }
  }

</script>

<style lang="scss">
  .order{
    .order-content{
      overflow-y: scroll;
    }
  }
</style>
