<template>
    <div>
        <el-row  type="flex" justify="center">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <h2>邦达国际物流平台管理系统</h2>
                </div> 
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
                        <el-form-item label="用户名:" prop="name">
                            <el-input v-model.trim="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item  label="密码:" prop="password">
                            <el-input type="password" v-model="ruleForm.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" style="width: 100%;" @click="login" :loading="loading">登录</el-button>
                        </el-form-item>
                        
                    </el-form>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
    import {post} from "@/utils/http"
    import {setToken} from "@/utils/auth"
    import { mapMutations } from "vuex"
    export default {
        data(){
            return{
                loading:false,
                ruleForm:{
                    name:"",
                    password:"",

                },
                rules:{
                    name:[
                            {required: true, message: '用户名不能为空', trigger: 'blur'},
                            { pattern:/^\w{3,8}$/, message: '用户名要求4-8位数字字母组成', trigger: 'blur' }
                        ],
                    password:[
                            {required: true, message: '密码不能为空', trigger: 'blur'},
                            { pattern:/^\w{4,8}$/, message: '密码要求4-8位数字字母组成', trigger: 'blur' }
                        ],
                }
            }
        },
         methods:{
            ...mapMutations(["setrole"]),
                    login(){
                        
                        this.$refs.ruleForm.validate((valid)=>{
                         if (valid) {
                                        this.loading=true
                                        post("/login",this.ruleForm).then(res=>{                                           
                                                this.loading=false                    
                                            setToken(res.token)
                                            console.log(res.token)
                                            sessionStorage.setItem("nickname",res.nickname)
                                            // 拿到role值
                                            this.setrole(res.role)
                                            this.$router.push("/layout")
                                        }).catch((erro)=>{
                                            this.loading=false
                                            console.log(erro)

                                        })
                                    } 
                        })
                    }
                }
    }
</script>

<style lang="less" scoped>
@bgColor:#5696ff;
.box-card{
    width: 500px;
    margin-top: 300px ;
    h2{
        text-align: center ;
        color:@bgColor;
    }
}
</style>