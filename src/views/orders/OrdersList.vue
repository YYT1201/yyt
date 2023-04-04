<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
      <el-row>
        <el-col :span="6">
          <el-input
            placeholder="输入订单号或客户名称"
            v-model="keyword"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6" :offset="12" class="opered">
          <el-button type="primary" @click="opens">新建订单</el-button>
          <el-button :disabled="!this.select.length" @click="operate(1)">审核</el-button>
          <el-button :disabled="!this.select.length" @click="operate(2)">修改</el-button>
          <el-button :disabled="!this.select.length" @click="operate(3)">作废</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-table 
      :data="tableData" 
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      @selection-change="handleSelectionChange"
      >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column  type="index" width="50" label="序号"></el-table-column>
        <el-table-column prop="id" label="订单号" fixed="left" width="100"></el-table-column>
        <el-table-column prop="status" label="状态" width="180">
            <template slot-scope="scope">
                <span v-if="scope.row.status==1">待审核</span>
                <span v-else-if="scope.row.status==2">已审核</span>
                <span  v-else-if="scope.row.status==3">审核通过</span>
                <span  v-else>审核拒绝</span>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="下单时间" width="180"> </el-table-column>
        <el-table-column prop="name" label="客户名称" width="180"></el-table-column>
        <el-table-column prop="start" label="起始城市" width="180"></el-table-column>
        <el-table-column prop="end" label="目的城市" width="180"> </el-table-column>
        <el-table-column prop="cargo" label="货物名称" width="180"></el-table-column>
        <el-table-column prop="count" label="件数" width="100"></el-table-column>
        <el-table-column prop="unit" label="单位" width="50"></el-table-column>
        <el-table-column prop="price" label="运费" width="180"></el-table-column>
        <el-table-column prop="from" label="订单来源" width="180"></el-table-column>
        <el-table-column prop="pay" label="是否支付" width="180">
            <template slot-scope="scope">
                {{ scope.row.pay==1?"需要接货":"不需要接货" }}
            </template>
        </el-table-column>
        <el-table-column  label="操作" fixed="right" width="180">
            <template  slot-scope="scope">
                <el-button size="mmini" @click="edit(scope.row)">编辑</el-button>
                <el-button size="mmini" type="danger">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="this.parmas.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total=this.total
      class="mt fr mb"
      >
    </el-pagination>
    </el-card>
    <orders-model :visible="visible" @hide="visible=false" @reload="getorderlist"></orders-model>
  </div>
</template>
<script>
import breadcrum from "@/mixins/breadcrum";
import {post} from "@/utils/http"
import OrdersModel from "./OrdersModel.vue";
import { mapMutations } from "vuex";
export default {
  mixins: [breadcrum],
  data(){
    return{
        visible:false,
        select:[],
        total:1,
        loading:false,
        tableData:[],
        keyword:"",
        parmas:{
            page:1,
            pageSize:20,
            keyword:""
        }
    }
  },
  components:{
    OrdersModel
  },
  created(){
    this.getorderlist()
  },
  methods:{
    async getorderlist(){
        this.loading=true
        const res= await post("/orderList",this.parmas)
        this.tableData=res.data.list
        this.total=res.data.total
        this.loading=false
    },
    handleSizeChange(pageSize){
        this.parmas.pageSize=pageSize
        this.getorderlist()
    },
    handleCurrentChange(page){
        this.parmas.page=page
        this.getorderlist()
    },
    handleSelectionChange(selection){
        this.select=selection
        console.log( this.select)
    },
    operate(type){
        console.log(type)
        let nos=this.select.map(item=>item.id)
        this.$notify({
          title: '操作成功',
          message: nos,
          type: 'success'
        });
    },
    opens(){
        this.visible=true
    },
    ...mapMutations(["getRow"]),
    edit(row){
        this.getRow(row)
        this.visible=true
    }
  }
};
</script>

<style lang="less" scoped>
.opered {
  text-align: right;
}
</style>