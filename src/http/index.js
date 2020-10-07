import axios from 'axios'
// import { Loading } from 'element-ui';
import store from '../store'


var instance=axios.create({
    baseURL:'',
})

// 请求拦截器
instance.interceptors.request.use((config)=>{

    // store.state.islod=true

    return config
})

// 响应拦截器
instance.interceptors.response.use((response)=>{
    // store.state.islod=false

    return response
})


export default instance;