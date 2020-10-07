<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,key) in banner" :key='key'>
                <img class="banner" :src="item.img" alt="">
            </van-swipe-item>
        </van-swipe>
        <van-list class="i-t"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell>
                <div class="image-text">
                    <dl v-for="(item,key) in list" :key="key">
                        <dt>
                            <img :src="item.src" alt="">
                        </dt>
                        <dd>
                            <p>{{ item.title }}</p>
                            <span class="js">{{ item.js }}</span>
                            <p class="by">{{ item.by }}</p>
                            <p>
                                <span class="price">￥{{ item.price }}</span>
                                <button @click="add(item)">+</button>
                            </p>
                        </dd>
                    </dl>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            banner:[],
            list:[],
            loading: false,
            finished: false,
            sl:2,
        };
    },
    created() {

    },
    mounted() {
        this.ajaxBann()
        this.ajaxList()
        // let {data} = await this.$Axios.get('/cart.json')
        // console.log(data)
        // this.banner=data.banner

        // let {data:res} = await this.$Axios.get('/cart.json')
        // console.log(res)
        // this.list=res.json
    },
    methods: {
        async ajaxBann(){
            let {data} = await this.$Axios.get('/cart.json')
            console.log(data)
            this.banner=data.banner
        },
        async ajaxList(){
            let {data} = await this.$Axios.get('/cart.json')
            console.log(data)

            this.list = data.json.filter((i,k) => {
                return i.id<=this.sl
            })
            console.log(this.list)
        },
        onLoad(){
            
            setTimeout(() => {
            
            this.sl+=2
            this.ajaxList()
            
            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.list.length >= 10) {
            this.finished = true;
            }
        }, 2000);
        }
    }
};
</script>

<style scoped lang='scss'>
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        height: 200px;
        text-align: center;
        background-color: #39a9ed;
    }
    .banner{
        width: 100%;
        height: 100%;
    }
    .image-text {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        box-sizing: border-box;
        padding-left: 10px;
        padding-right: 20px;
        padding: 0;
        dl {
            width: 45%;
            padding: 0;
            dt {
            img {
                width: 190px;
                height: 224px;
            }
            }
            dd {
            font-size: 13px;
            .js {
                color: #c2c4c1;
                font-size: 12px;
            }
            .by {
                width: 120px;
                height: 15px;
                line-height: 15px;
                text-align: center;
                font-size: 10px;
                border: 1px solid #c2c4c1;
                border-radius: 50px;
                color: #c2c4c1;
            }

            .price {
                color: #e68d9f;
            }
            button {
                width: 23px;
                height: 23px;
                line-height: 13px;
                background: #ff3b7f;
                color: white;
                border: 1px solid #ff3b7f;
                border-radius: 50px;
                float: right;
                margin-right: 17px;
            }
            }
        }
    }
</style>
