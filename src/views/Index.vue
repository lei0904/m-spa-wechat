<template>
  <div class="Index">
  </div>
</template>
<script>
  export default {
    data() {
      return {
          openid:''
      };
    },
    methods: {
    },
    mounted: function () {
        let ts = this;
        let href = window.location.href;
        console.log('href-----',href)
        console.log(href.split('?'))
        let localHref =href.split('#')[0];
        let temp =href.split('#')[1];
        ts.openid = temp.substring(temp.indexOf('=')+1,temp.indexOf('&'));
        console.log('----localHref----',localHref)
        this.$router.push({path:'/register'})
    }
  }

</script>

<style lang="scss">

</style>
