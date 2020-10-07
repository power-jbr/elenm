<template>
    <div>
        <header>
            <p class="left">ele.me</p>
            <p class="right" @click="login()">登录 <span> | 注册</span></p>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        login(){
            this.$router.push('/login')
        }
    }
};
</script>

<style lang='scss'>
header{
  width: 100%;
  height: 50px;
  display: flex;
  color: white;
  background: #3190E8;
  flex-shrink: 0;
  position: fixed;
  z-index: 1000;
  .left{
    margin-left: 10px;
  }
  .center{
    margin-left: 110px;
  }
  .right{
    margin-left: 257px;
    // margin-left: 90px;
  }
}
</style>
