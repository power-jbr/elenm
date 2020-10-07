<template>
    <div class="c">
        <header class="h">
            <span class="left_f" @click="fan()">〈</span>
            <span class="pwd">密码登录</span>
        </header>

        <div class="input">
            <input type="text" v-model='name' placeholder="账号">
            <input class="pas" v-model="pwd" :type="type" placeholder="密码">
            <input type="text" v-model="yzm" placeholder="验证码">
        </div>

        <div class="ts">
            <p>温馨提示：未注册过的账号，登录时将自动注册</p>
            <p>注册过的用户可凭账号密码登录</p>
        </div>

        <div class="btn">
            <button :disabled='dis' @click="add()">登录</button>
        </div>

        <p class="cz">重置密码?</p>

        <Swiper @gb='gai'></Swiper>

        <p class="tu">
            <img :src="src" alt="">
        </p>
        <div class="yz" @click="qh()">
            <span>看不清</span><br>
            <span :style="{color:'#3190e8'}">换一张</span>
        </div>

        <p v-html="val" class="cuo"></p>

        <div class="sx" v-show="flag">
            <p>{{ sx.message }}</p>
            <p>{{ ys }}</p>
            <button @click="qr">确认</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
axios.defaults.withCredentials=true;//让ajax携带cookie

// import {ajaxcityP} from '../utils/api'
// import bus from '../plugins/bus'
import $ from 'jquery'
import Swiper from './Swiper'
export default {
    data() {
        return {
            name: '',
            src:'',
            dis:false,
            type:'password',
            val:'',
            pwd:'',
            yzm:'',
            sx:[],
            flag:false,
            ys:'',
            xid:'',
        };
    },
    created() {

    },
    mounted() {
        this.img()
    },
    methods: {
        setCookie(key,value,t){
            var oDate=new Date();
            oDate.setDate(oDate.getDate()+t);
            document.cookie=key+"="+value+"; expires="+oDate.toDateString();
        },
        fan(){
            this.$router.go(-1)
        },
        img(){
            axios.post('http://elm.cangdu.org/v1/captchas').then((res) => {
                console.log(res)      
                this.src=res.data.code
            })
        },
        qh(){
            this.img()
        },
        gai(ind){
            console.log(ind)
            if(ind){
                this.type='text'
            }else{
                this.type='password'
            }
        },
        
        add(){

            let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(!myreg.test(this.name)){
                this.val='请输入手机号或者用户名'
                return false
            }else{
                this.val=''
                
                this.setCookie("cap",this.yzm,2)
                this.setCookie("SID",100,2)

                axios.post('/api/v2/login',{
                    username:this.name,
                    password:this.pwd,
                    captcha_code:this.yzm
                    }).then((res) => {
                    this.sx=res.data
                    if(this.sx.message=='验证码失效'){
                        this.flag=true
                    }
                    
                    this.xid=this.sx.id

                    if(this.name==this.sx.username){
                        let xid = JSON.parse(localStorage.getItem('xid'))

                        xid=this.xid
                        this.$router.push({
                            path:'/',
                            query:{
                                id:xid
                            }
                        })
                        console.log(this.xid)
                        localStorage.setItem('xid',JSON.stringify(xid))
                    }
                })
                return true
            }
        },
        // setCookie(key,value,t){
        //     var oDate=new Date();
        //     oDate.setDate(oDate.getDate()+t);
        //     document.cookie=key+"="+value+"; expires="+oDate.toDateString();
        // },
        qr(){
            this.flag=false
        }
    },
    watch:{

    },
    components: {
        Swiper
    }
};
</script>

<style lang='scss'>
.c{
    width: 100%;
    height: 100%;
    background: #eee;
}
.h{
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    background: #3190e8;
    color: white;
    .left_f{
        margin-left: 10px;
        font-size: 20px;
    }
    .pwd{
        font-size: 23px;
        margin-left: 130px;
    }
}
.input{
    width: 100%;
    box-sizing: border-box;
    padding-top: 60px;
    input{
        width: 100%;
        height: 55px;
        border: none;
        text-indent: 10px;
        font-size: 18px;
        border-bottom: 1px solid #ddd;
    }
}
.ts{
    width: 100%;
    height: 70px;
    line-height: 20px;
    color: red;
    text-indent: 10px;
}
.btn{
    width: 100%;
    height: 50px;
    text-align: center;
    button{
        width: 95%;
        height: 50px;
        line-height: 50px;
        background: #4CD964;
        border: 1px solid #4CD964;
        border-radius: 5px;
        color: white;
        font-size: 17px;
    }
}
.cz{
    width: 90px;
    height: 30px;
    margin-right: 10px;
    color: #3B95E9;
    line-height: 30px;
    text-align: center;
    float: right;
}
.tu{
    position: absolute;
    top: 175px;
    right: 70px;
}
.yz{
    position: absolute;
    top: 185px;
    right: 12px;
    font-size: 13px;
}
.cuo{
    color: red;
    position: absolute;
    top: 60px;
    right: 20px;
    // top: 100px;
    // left: 10px;
}
.sx{
    width: 270px;
    height: 200px;
    background: white;
    position: absolute;
    top: 30%;
    left: 15%;
    line-height: 110px;
    z-index: 1000;
    p{
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 22px;
    }
    button{
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin-top: 56px;
        border: 1px solid #4CD964;
        background: #4CD964;
        color: white;
        border-radius: 0px 0px 5px 5px;
    }
}
</style>
