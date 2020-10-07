<template>
    <div>
        <p class="db">abc</p>
        <p class="qiu" @click="gai()"></p>
    </div>
</template>

<script>
import $ from 'jquery'
import bus from '../plugins/bus'
export default {
    data() {
        return {
            flag:true
        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        gai(){
            this.flag=!this.flag
            this.$emit('gb',this.flag)
            if(this.flag){
                // this.flag=false
                $('.qiu').css('right','23px')
                $('.qiu').css('transition','0.3s')
                $('.db').css('background','#4CD964')
            }else{
                // this.flag=true
                $('.qiu').css('right','60px')
                $('.qiu').css('transition','0.3s')
                $('.db').css('background','#CCCCCC')
            }
        }
    }
};
</script>

<style scoped lang='scss'>
.db{
    width: 60px;
    height: 25px;
    line-height: 25px;
    text-indent: 10px;
    border-radius: 50px;
    position: absolute;
    top: 118px;
    right: 31px;
    background: #CCCCCC;
    color: white;
}
.qiu{
    width: 33px;
    height: 33px;
    border-radius: 50px;
    position: absolute;
    top: 113px;
    right: 60px;
    background: #eee;
}
</style>
