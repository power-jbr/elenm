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
const instance = axios.create({
    baseURL:'http://elm.cangdu.org',
    timeout: 7000
})

instance.interceptors.request.use((config)=>{
    return config
})

instance.interceptors.response.use((res)=>{
    return res
})

export default instance