import router  from "./index";
import { getToken } from "@/utils/auth";
import asyncRoutes from "./asyncRouterMap";
import store from "@/store";
router.beforeEach(async(to,from,next)=>{
    console.log("导航守卫操作")
    const hasToken=getToken();
    //筛选数组
    let arryRole=asyncRoutes.filter(item=>item.meta.auth.includes(store.state.role))
    console.log("role获取:",arryRole)
    if(hasToken){
        await store.dispatch("getrole")
        if(to.path=="/login"){
            next("/layout")
        }else{
            if(to.name==null){    
                for(let i=0;i<arryRole.length;i++){
                    router.addRoute(arryRole[i])
                }
                next({...to,replace:true})
            }else{
                next();
            }
        }
    }else{
        if(to.path=="/login"){
            next()
        }else{
            next("/login")
        }
    }
})