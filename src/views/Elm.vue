<template>
    <div class="b">
    <Header :id='id'></Header>
        <div class="box">
            <div class="cont">
                <div class="city_tip" id="top">
                    <span>当前定位的城市：</span>
                    <span>定位不准时，请在城市列表中选择</span>
                </div>
                <div class="guess_city" v-for="(item,index) in loc" :key='index'>
                    <span class="arrow_left">{{ item.name }}</span>
                    <span class="arrow_right">〉</span>
                </div>

                <!-- <div class="grid">
                    <p>热门城市</p>
                    <van-grid class="van-grid">
                        <van-grid-item class="item" v-for="(item,key) in hot" :key='key' :text="item.name" />
                    </van-grid>
                </div> -->
                <div class="grid">
                    <p>热门城市</p>
                    <ol class="van-grid">
                        <li @click="xq(item.id,item.name)" v-for="(item,key) in hot" :key='key'>
                            <span>{{ item.name }}</span>
                        </li>
                    </ol>
                </div>

                <!-- <div class="city_a">
                    <ul class="ul">
                        <li v-for="(item,key) in obj" :key='key'>
                            <a class='md' :href="'#'+k" v-for="(i,k) in item" :key='k'>
                                {{ k }}
                            </a>
                        </li>
                    </ul>
                </div> -->

                <div class="title">
                    <ul>
                        <li v-for="(item,key) in obj" :key='key'>
                            <p :id="k" class="city_title" v-for="(i,k) in item" :key='k'>
                                {{ k }}
                                <ol>
                                    <li v-for="(m,index) in i" :key='index' @click="cs(m.name)">
                                        {{ m.name }}
                                    </li>
                                </ol>
                            </p>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
        <div class="city_l">
            <ul class="uu">
                <li v-for="(item,key) in obj" :key='key'>
                    <a class='md' :href="'#'+k" v-for="(i,k) in item" :key='k'>
                        {{ k }}
                    </a>
                </li>
            </ul>
        </div>
        <a href="#top" class="top" v-show="flag" @click="top">∧</a>
    </div>
</template>

<script>
import {ajaxcityG} from '../utils/api'
import Header from './Header'
import IScroll from '../plugins/iscroll-probe'
export default {
    data() {
        return {
            loc:[],
            iscroll:'',
            hot:[],
            list:{},
            flag:false,
            obj:[],
            id:'',
        };
    },
    created() {

    },
    async mounted() {
        let { data } = await this.$Axios.get('http://elm.cangdu.org/v1/cities?type=guess')
        // let { data } = await ajaxcityG('guess')
        console.log(data)
        this.loc.push(data)
        // console.log(this.loc)

        let { data:res } = await this.$Axios.get('http://elm.cangdu.org/v1/cities?type=hot')
        this.hot = res
        console.log(this.hot)

        let { data:msg } = await this.$Axios.get('http://elm.cangdu.org/v1/cities?type=group')
        let px=Object.keys(msg)
        px.sort()
        // console.log(px)

        for(let i in px){
            this.list[px[i]]=msg[px[i]]
        }

        this.obj.push(this.list)

        // console.log(this.obj)
        // console.log(this.list)

        this.iscroll = new IScroll('.box',{})
        this.$nextTick(()=>{
            this.iscroll.refresh()
        })

        this.iscroll.on('scrollEnd',()=>{
            console.log(this.iscroll)
            if((this.iscroll.y*-1)>=371){
                this.flag=true
            }else{
                this.flag=false
            }
        })

        this.id = localStorage.getItem('xid')
        console.log(this.id)
        
    },
    methods: {
        top(){
            this.iscroll.scrollTo(0,0,1000)
        },
        cs(val){
            console.log(val)
            this.$router.push({
                path:'/detail',
                query:{
                    val:val
                }
            })
        },
        xq(id,name){
            this.$http.get(`/v1/pois?type=search$city_id=${id}&keyword=${name}`).then((data)=>{
                console.log(data)
                this.$router.push({
                   path:'/xq',
                   query:{
                       data:data,
                       name:name,
                       id:id,
                   } 
                })
            })
            // this.$http.get(`http://elm.cangdu.org/v1/user?user_id=${id}`).then((data) => {
            //     console.log(data)
            //     this.$router.push({
            //        path:'/xq',
            //        query:{
            //            data:data,
            //            name:name
            //        } 
            //     })
            // })
        }
    },
    components: {
        Header
    }
};
</script>

<style lang='scss'>
.city_l{
    height: 100%;
    position: fixed;
    right: 0;
    top: 180px;
    a{
        display: block;
        margin-top: 7px;
        color: black;
        // color: #3190e8;
    }
}
.b{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .box{
        flex: 1;
        overflow: hidden;
        margin-top: 50px;
        .cont{
            min-height: 101%;
            background: #eee;
        }
    }
}
.top{
    width: 55px;
    height: 55px;
    text-align: center;
    line-height: 53px;
    border-radius: 50px;
    background: #ddd;
    position: fixed;
    bottom: 31px;
    right: 17px;
    z-index: 1000;
    font-size: 30px;
    color: white;
}
.ul{
    width: 100%;
    background: white;
    margin-top: 10px;
    li{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        margin-left: 13px;
        a{
            width: 40px;
            height: 40px;
            margin-top: 20px;
            color: #3190e8;
        }
    }
}
ul,ol{
    list-style: none;
}
.city_tip{
    width: 100%;
    height: 40px;
    background: white;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px 10px;
}
.guess_city{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: white;
    box-sizing: border-box;
    padding: 0px 10px;
}
.arrow_left{
    font-size: 21px;
    color: #3190e8;
}
.arrow_right{
    float: right;
}
.grid{
    width: 100%;
    p{
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        text-indent: 13px;
        background: white;
    }
    // .van-grid{
    //     margin-top: -14px;
    //     border-bottom: 2px solid #E8E8E8;
    //     .item{
    //         border: 1px solid #E8E8E8;
    //         border-left: none;
    //         border-bottom: none;
    //     }
    // }
    .van-grid{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        background: white;
        margin-top: -14px;
        li{
            width: 98px;
            height: 50px;
            text-align: center;
            line-height: 50px;
            font-size: 13px;
            border: 1px solid #ddd;
            border-left: none;
            border-bottom: none;
            span{
                color: #3190e8;
            }
        }
    }
}
.title{
    width: 100%;
    ul{
        width: 100%;
        li{
            width: 100%;
            display: flex;
            flex-direction: column;
            p{
                width: 100%;
                line-height: 30px;
                background: white;
            }
            ol{
                width: 100%;
                height: 100%;
                display: flex;
                flex-wrap: wrap;
                margin-top: 5px;
                li{
                    box-sizing: border-box;
                    font-size: 14px;
                    width: 133.3px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    border: 1px solid #E8E8E8;
                    overflow: hidden;
                    
                }
            }
        }
    }
}
</style>
