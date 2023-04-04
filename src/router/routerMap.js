export default [
        {
            path:"/login" ,
            name:"Login",
            component:()=>import("@/views/LoginView.vue")
        },
        {
          path:"/layout" ,
          name: "Layout",
          component:()=>import("@/views/LayOut.vue"),
          redirect:"index",
          children:[
            {
            path:"/index" ,
            name:"index",
            component:()=>import("@/views/index/HomeIndex.vue")
            },
            {
          
              path:"/orders/list" ,
              name:"orders_list",
              component:()=>import("@/views/orders/OrdersList.vue"),
              meta:{bread:["订单管理","订单列表"]}
    
          },
          {
            path:"/waybill/list" ,
            name:"waybill_list",
            component:()=>import("@/views/transport/WaybillList.vue"),
            meta:{bread:["运单管理","运单列表"],keepAilve:true}
        },
        {
          path:"/waybill/list/detial" ,
          name:"waybill_list_detial",
          component:()=>import("@/views/transport/WaybillDetial.vue"),
          meta:{bread:["运单管理","运单列表","运单详情"]} 
        }
          ]
        },
        
        
    ]