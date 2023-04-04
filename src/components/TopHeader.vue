<template>
    <div>
        <el-dropdown class="fr"  @command="handleCommand">
            <span class="el-dropdown-link">
                欢迎加您，{{info}}
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">个人中心</el-dropdown-item>
                <el-dropdown-item command="b">修改密码</el-dropdown-item>
                <el-dropdown-item command="c">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="txtin fr">今天是你在阿里的第
            <span class="time">{{ days }}</span>
            天
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
import { removeToken } from '@/utils/auth';
import {get} from "@/utils/http"

    export default {
        data(){
            return{
                info:sessionStorage.getItem("nickname"),
                time:""
            }
        },
        created(){
            //入职时间
            this.workTime()
        },
        methods:{
            handleCommand(item){
                if(item=="c"){
                    removeToken()
                    this.$router.push("/login")
                }
            },
            workTime(){
                get("/in").then(res=>{
                    this.time=res.time
                }) 
            }
        },
        computed:{
            days(){
                let now=new Date();
                let day=this.time?new Date(this.time):new Date();
                return Math.floor((now-day)/1000/60/60/24)
            }
        }
    }
</script>

<style lang="less" scoped>
.txtin{
    margin-right: 50px;
    .time{
        color: #5696ff;
        font-size: 24px;
    }
}

</style>