<template>
  <div>
    <bread-crum></bread-crum>
    <el-card class="mt">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input placeholder="请输入运单号" v-model="parmsa.waybillNo"></el-input>
        </el-col>
        <el-col :span="6">
          <el-input placeholder="请输入客户名称"  v-model="parmsa.name"></el-input>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="data"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6" class="tr">
          <el-button type="primary" @click="getwaybill">查询</el-button>
          <el-button type="primary">充值</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-radio-group v-model="parmsa.status" @change="getwaybill">
        <el-radio-button label="1">全部运单(300)</el-radio-button>
        <el-radio-button label="2">装货中(700)</el-radio-button>
        <el-radio-button label="3">运输中(200)</el-radio-button>
        <el-radio-button label="4">已完成(100)</el-radio-button>
        <el-radio-button label="5">运单异常(0)</el-radio-button>
      </el-radio-group>
    </el-card>
    <!-- 运单列表 -->
    <el-card class="mt">
      <el-table 
        :data="tableData" 
        style="width: 100%" 
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column type="index"  width="50" label="序号" fixed="left" > </el-table-column>
          <el-table-column prop="no" label="订单号" width="180"> </el-table-column>
          <el-table-column prop="date" label="下单时间" width="180"> </el-table-column>
          <el-table-column prop="name" label="客户名称" width="180"> </el-table-column>
          <el-table-column prop="cargo" label="货物名称" width="180"> </el-table-column>
          <el-table-column prop="count" label="件数" width="180"> </el-table-column>
          <el-table-column prop="start" label="起始城市" width="180"> </el-table-column>
          <el-table-column prop="end" label="目的是城市" width="180"> </el-table-column>
          <el-table-column prop="price" label="运费" width="180"> </el-table-column>
          <el-table-column prop="neddRecive" label="接货" width="180">
              <template slot-scope="scope">
                      {{ scope.row.pay==1?"需要":"不需要" }}
                  </template>
          </el-table-column>
          <el-table-column prop="plateNumber" label="车牌号" width="180"> </el-table-column>
          <el-table-column prop="driver" label="司机姓名" width="180"> </el-table-column>
          <el-table-column prop="tel" label="电话号" width="180"> </el-table-column>
          <el-table-column prop="percent" label="运输进度" width="180">
                  <template slot-scope="scope">
                      <el-progress  :percentage="scope.row.percent"></el-progress>
                  </template>
          </el-table-column>
          <el-table-column  label="操作" width="180" fixed="right">
              <el-button @click="detial">详情</el-button>
              <el-button type="danger">修改</el-button>
          </el-table-column>
        </el-table>
        <el-pagination
              class="mt fr mb"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="47">
        </el-pagination>
    </el-card>
  </div>
</template>

<script>
import BreadCrum from "@/components/BreadCrum.vue";
import moment from "moment"
import {post} from "@/utils/http"
import { mapMutations,mapState } from "vuex";
export default {
  data() {
    return {
      currentPage:1,
      loading:false,
      value1: "",
      data:"",
      tableData:[],
      pageDate:{
        page:"1",
        pageSize:"10"
      },
      parmsa:{
        waybillNo:"",
        name:"",
        status:"10"
      },
     
    };
  },
  components: {
    BreadCrum,
  },
  computed:{
    ...mapState(["fromDate"])
  },
  created(){
    this.getwaybill()
  },
  activated(){
    if(this.fromDate==false){
      this.getwaybill()
    }
  },
  beforeRouteLeave(to,from,next){
    if(to.path=="/waybill/list/detial"){
      from.meta.keepAilve=true
    }else{
      this.clearCache()
    }
    next()
  },
  methods:{
    ...mapMutations(["changefromDate"]),
      async  getwaybill(){
                this.loading=true
                let startDate=this.data[0]?moment(this.data[0]).format("YYYY-MM-DD"):""
                let endDate=this.data[0]?moment(this.data[0]).format("YYYY-MM-DD"):""
                const res= await post("/waybillList",{...this.parmsa,...this.pageDate,startDate,endDate})
                this.tableData=res.data.list
                this.loading=false

            },
      handleSizeChange(pageSize){
        this.pageDate.pageSize=pageSize
        this.getwaybill()
      },
      handleCurrentChange(page){
          this.pageDate.page=page
          this.getwaybill()
      },
     detial(){
      this.$router.push("/waybill/list/detial")
     },
     clearCache(){
              let vnode = this.$vnode;
              let parentVnode = vnode && vnode.parent;
              if (
              parentVnode &&
              parentVnode.componentInstance &&
              parentVnode.componentInstance.cache
              ) {
              var key =
              vnode.key == null
              ? vnode.componentOptions.Ctor.cid +
              (vnode.componentOptions.tag
              ? `::${vnode.componentOptions.tag}`
              : "")
              : vnode.key;
                var cache = parentVnode.componentInstance.cache;
              var keys = parentVnode.componentInstance.keys;
              if (cache[key]) {
              this.$destroy();
              // remove key
              if (keys.length) {
              var index = keys.indexOf(key);
              if (index > -1) {
              keys.splice(index, 1);
              }
              }
              cache[key] = null;
              }
          }
     }
   
  },
 
}
</script>

<style lang="less" scoped>
</style>