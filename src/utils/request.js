import axios from 'axios'
// import { Loading } from 'element-ui';
// import store from '../store'

// const instance=axios.create({
//     baseURL:'http://elm.cangdu.org',
//     timeout: 2000
// })

// 请求拦截器
// instance.interceptors.request.use((config)=>{
//     return config
// })

// 响应拦截器
// instance.interceptors.response.use((response)=>{
//     return response
// })


// export default instance;
// instance 新创建的一个axios 赋值给instance
const instance = axios.create({
    baseURL:'http://elm.cangdu.org',
    timeout: 7000
})

//让ajax携带cookie
instance.defaults.withCredentials=true;

// 请求拦截器
instance.interceptors.request.use((config)=>{
    return config
})

// 响应拦截器
instance.interceptors.response.use((res)=>{
    return res
})

// 将新创建的一个axios导出
export default instance