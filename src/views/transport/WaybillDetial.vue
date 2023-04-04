<template>
    <div>
        <BreadCrum></BreadCrum>
        <el-button type="danger" class="mt" @click="list">返回</el-button>
    </div>
</template>

<script>
import BreadCrum from '../../components/BreadCrum.vue'
import { mapMutations } from 'vuex';
    export default {
        components:{
            BreadCrum
        },
        methods:{
            ...mapMutations(["changefromDate"]),
            list(){
                this.$router.push("/waybill/list")
            },
            ...mapMutations(["changefromDate"])
        },
        beforeRouteLeave(to,from,next){
            if(to.path=="/waybill/list"){
                this.changefromDate(true)
            }else{
                this.changefromDate(false)
            }
            next()
        }
    }
</script>

<style lang="less" scoped>

</style>