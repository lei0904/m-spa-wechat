<template>
  <div class="exam">
    <v-touch v-on:swipeleft="onSwipeLeft()"  v-on:swiperight="onSwipeRight()">Swipe me!</v-touch>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {
      onSwipeLeft(){
        console.log('---onswipeLeft')
      },
      onSwipeRight(){
        console.log('---onswipeRight')
      }
    },
    mounted: function () {

    }
  }

</script>

<style lang="scss">
  .exam{
    height: 100vh;
  }

</style>
