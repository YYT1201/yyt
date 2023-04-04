<template>
    <div>
        <el-container>
            <el-aside width="200px" class="aside">
                <nav-left></nav-left>
            </el-aside>
            <el-container>
                <el-header class="head">
                    <top-header></top-header>
                </el-header>
                <el-main class="main">
                    <keep-alive>
                        <router-view v-if="$route.meta.keepAilve"></router-view>
                    </keep-alive>
                    <router-view v-if="!$route.meta.keepAilve"></router-view>
                </el-main>
                <el-footer class="foot">
                    京备案1234567890
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import NavLeft from '@/components/NavLeft.vue';
import TopHeader from '@/components/TopHeader.vue';
export default {
     components:{
        NavLeft,TopHeader
     }
}

</script>

<style lang="less" scoped>
.head{
    line-height: 60px;
    background-color: #fff;
    box-shadow: 0 2px 2px rgba(0,21,41, 0.3);
}
.aside{
    background-color: #001529;
    height: 100vh;
}
.main{
    height: 70vh;
    background-color: #e9eef3;
}
.foot{
    color: #999999;
    font-size: 12px;
    line-height: 60px;
    text-align: center;
}
</style>