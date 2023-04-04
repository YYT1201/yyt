export default [
    {
        path:"/annenthed" ,
        name:"annenthed",
        component:()=>import("@/views/AuthView/AuthAnnenthed"),
        meta:{auth:["boss","admin"]}
    },
    {
        path:"/saleary" ,
        name:"saleary",
        component:()=>import("@/views/AuthView/AythSaleary"),
        meta:{auth:["boss","finance"]}
    },
    {
        path:"*" ,
        name:"notfound",
        component:()=>import("@/views/NotFound"),
        meta:{auth:["boss","finance","user"]}
      },
]