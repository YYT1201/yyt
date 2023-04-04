import axios  from "axios";
import { Message } from 'element-ui';
import { setToken } from "./auth";
const service = axios.create({
    baseURL:"http://localhost:8080",
    timeout:5000
})

 service.interceptors.request.use((config)=>{
   if(setToken()){
        config.headers.token=setToken()
   }
    return config
 },()=>{
    Message({
        type:"error",
        message:"请求错误",
     })
     return Promise.reject(new Error("请求错误"))
  })



//响应拦截器
service.interceptors.response.use((res)=>{
    const result=res.data;
    if(result.success){
        return result
    }else{
         Message({
            type:"error",
            message:result.message||"请求错误",
         })
         console.log(result.message)
         return Promise.reject(new Error(result.message||"请求错误"))
    }
  },()=>{
    Message({
        type:"error",
        message:"请求错误",
     })
     return Promise.reject(new Error("请求错误"))
  })

//导出
export default service