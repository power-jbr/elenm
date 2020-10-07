<template>
    <div>
        <header>
            <p class="left">ele.me</p>
            <!-- <p class="right" @click="login()">登录 | 注册</p> -->
            <p v-if="id==undefined||id==''" class="right" @click="login()">登录 | 注册</p>
            <van-icon @click="tb" v-else class="xr" name="user-circle-o"></van-icon>
        </header>
    </div>
</template>

<script>
export default {
  // props:['id'],
    data() {
        return {
          id:''
        };
    },
    created() {

    },
    mounted() {
      this.id = localStorage.getItem('xid')
      console.log(this.id)
    },
    methods: {
        login(){
            this.$router.push('/login')
        },
        tb(){
          this.$router.push({
            path:'/my',
            query:{
              id:this.id
            }
          })
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
  .xr{
    font-size: 22px;
    line-height: 50px;
    margin-left: 310px;
  }
}
</style>
