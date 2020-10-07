<template>
  <div id="app">
    <!-- <header @dblclick="top()">
      <p class="left" @dblclick="top()">ele.me</p>
      <p class="right" @click="login()">登录 <span> | 注册</span></p>
    </header> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {

    };
  },
  methods: {
    
  },
  components: {

  }
}
</script>

<style lang='scss'>
html,body,#app{
  width: 100%;
  height: 100%;
}
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  // display: flex;
  // flex-direction: column;
}
// header{
//   width: 100%;
//   height: 50px;
//   display: flex;
//   color: white;
//   background: #3190E8;
//   flex-shrink: 0;
//   position: fixed;
//   z-index: 1000;
//   .left{
//     margin-left: 10px;
//   }
//   .center{
//     margin-left: 110px;
//   }
//   .right{
//     margin-left: 257px;
//     // margin-left: 90px;
//   }
// }
</style>
