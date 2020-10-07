import { publicPath } from '../../vue.config';
<template>
  <div class="pd">
    <div class="he">
      <p class="left" @click="fan()">〈</p>
      <p class="center" :style="{ marginLeft: '31px' }">{{ name }}</p>
      <p class="right" @click="fan()">切换城市</p>
    </div>

    <div class="sou">
      <input
        v-model="sou"
        @keyup.enter="add()"
        type="text"
        placeholder="输入学校，商务楼，地址"
        @input="bh()"
      /><br />
      <button @click="tj()">提交</button>
    </div>
    <h5>搜索历史</h5>
    <div class="lsjl" v-show="ls">
        <ul>
            <li v-for="(item,key) in ssls" :key='key'>
                <p class="val">{{ item.name }}</p>
                <p class="dz">{{ item.address }}</p>
            </li>
        </ul>
        <p class="clear" v-show="xls" @click="clear()">清空所有</p>
    </div>
    <div class="ls"></div>

    <div class="ssmb" v-show="xs">
        <ul>
            <li @click="tjls(item)" v-for="(item,key) in ss" :key='key'>
                <p class="val">{{ item.name }}</p>
                <p class="dz">{{ item.address }}</p>
            </li>
            <li v-show="flag">
                <p>很抱歉！无搜索结果</p>
            </li>
        </ul>
    </div>

    <div>
        <p class="cuo" v-show="cuo" @click="qk">X</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: [],
      name: "",
      sou: "",
      lisi: "",
      ss: [],
      id: 1,
      flag:false,
      xs:false,
      cuo:false,
      ls:false,
      xls:false,
      ssls:JSON.parse(localStorage.getItem('hs'))||[],
    };
  },
  created() {},
  mounted() {
    this.name = this.$route.query.name;
    console.log(this.name);

    this.search = this.$route.query.data.data;
    console.log(this.search);

    this.id = this.$route.query.id;
    console.log(this.id);

    this.ajaxList();

    if(this.ssls.length>0){
        this.ls=true
        this.xls=true
    }else{
        this.ls=false
        this.xls=false
    }
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    add() {
      this.ajaxList();
      this.xs=true
    },
    tj() {
      this.add();
    },
    ajaxList() {
      // this.$Axios.get(`http://elm.cangdu.org/v1/pois?type=search&city_id=${this.id}&keyword=${this.sou}`).then((res) => {
      this.$Axios
        .get("http://elm.cangdu.org/v1/pois", {
          params: { type: "search", city_id: this.id, keyword: this.sou },
        })
        .then((res) => {
          console.log(res.data);
          this.ss = res.data;
        //   if(this.ss==[]){
        //         this.flag=true
        //     }else{
        //         this.flag=false
        //     }
        });
    },
    bh(){
        if(this.sou!=''){
            this.cuo=true
        }else{
            this.cuo=false
        }
    },
    qk(){
        this.sou=''
        this.cuo=false
    },
    tjls(val){
        this.ssls.push(val)
        this.xs=false

        this.sou=''
        this.cuo=false

        if(this.ssls!=[]){
            this.ls=true
            this.xls=true
        }else{
            this.ls=false
            this.xls=false
        }
    },
    clear(){
        this.ssls=[]
        this.xls=false
        this.ls=false
    }
  },
  watch: {
      ssls:{
          handler(val){
            localStorage.setItem('hs',JSON.stringify(val))
          },
          deep:true
      }
  }
};
</script>

<style scoped lang="scss">
.he {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 10px;
  color: white;
  background: #3190e8;
  position: fixed;
  z-index: 1000;
  margin-bottom: 50px;
}
.pd {
  width: 100%;
  height: 100%;
  background: #eee;
}
.sou {
  width: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  text-align: center;
  border-bottom: 1px solid #ddd;
  background: white;
  input {
    width: 90%;
    height: 35px;
    margin-top: 20px;
    border: 1px solid #e4e4e4;
    text-indent: 10px;
  }
  button {
    width: 91%;
    height: 40px;
    margin-top: 20px;
    margin-bottom: 20px;
    background: #3190e8;
    border: 1px solid #3190e8;
    color: white;
  }
}
h5 {
  width: 100%;
  height: 22px;
  line-height: 23px;
  text-indent: 15px;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
.ssmb{
    width: 100%;
    height: 100%;
    background: white;
    position: absolute;
    top: 190px;
    ul{
        width: 100%;
        li{
            // background: pink;
            padding: 5px 10px;
            box-sizing: border-box;
            border-top: 1px solid #ddd;
            .val{
                width: 90%;
                font-size: 18px;
                color: #333;
            }
            .dz{
                font-size: 13px;
                color: #999999;
            }
        }
    }
}
.lsjl{
    width: 100%;
    box-sizing: border-box;
    padding: 3px 0px;
    background: white;
    ul{
        width: 100%;
        li{
            box-sizing: border-box;
            padding-left: 20px;
            border-bottom: 1px solid #ddd;
            .val{
                width: 90%;
                font-size: 18px;
                color: #333;
            }
            .dz{
                font-size: 13px;
                color: #999999;
            }
        }
    }
    .clear{
        font-size: 18px;
        text-align: center;
    }
}
.cuo{
    position: absolute;
    top: 65px;
    right: 30px;
    z-index: 1000;
    color: #4068AB;
    font-weight: bold;
}
</style>
