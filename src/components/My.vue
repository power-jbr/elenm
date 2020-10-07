<template>
    <div>
        <div class="he">
            <p class="left" @click="fan()">〈</p>
            <p class="center">我的</p>
            <p class="right">〉</p>
        </div>
    </div>
</template>

<script>
export default {
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
        fan(){
            this.$router.go(-1)
        }
    }
};
</script>

<style scoped lang='scss'>
.he{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
  color: white;
  background: #3190E8;
  position: fixed;
  z-index: 1000;
}
</style>
