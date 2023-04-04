<template>
  <div>
    <el-dialog
      title="提示"
      :visible="visible"
      width="50%"
      :before-close="close"
    >
      <el-row>
        <el-form :model="ruleForm" :rules="rules" label-width="100px" ref="ruleForm">
          <el-col :span="12">
            <el-form-item label="客户名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="起始城市" prop="start">
                <el-input v-model="ruleForm.start"></el-input>
            </el-form-item>
            <el-form-item label="目的城市" prop="end">
                <el-input v-model="ruleForm.end"></el-input>
            </el-form-item>
            <el-form-item label="货物名称" prop="cargo">
                <el-input v-model="ruleForm.cargo"></el-input>
            </el-form-item>
            <el-form-item label="件数" prop="count">
                <el-input v-model="ruleForm.count"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单位" prop="unit">
                <el-input v-model="ruleForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="运费" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item prop="from" label="订单来源">
                <el-radio-group v-model="ruleForm.from">
                    <el-radio  label="移动端">移动端</el-radio>
                    <el-radio  label="pc端">PC端</el-radio>
                </el-radio-group>      
            </el-form-item>
            <el-form-item prop="pay" label="是否支付">
                <el-radio-group v-model="ruleForm.pay">
                    <el-radio  :label="1">已支付</el-radio>
                    <el-radio  :label="2">未支付</el-radio>
                </el-radio-group>   
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary"  @click="save" >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { post } from '@/utils/http';
import { mapState,mapMutations } from 'vuex';
export default {
  data(){
    return{
        ruleForm:{
            name:"",
            start:"",
            end:"",
            cargo:"",
            count:"",
            unit:"",
            price:"",
            from:"",
            pay:"",

        },
        rules:{
        name: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
        start: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          end: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          cargo: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          count: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { pattern: /^\d+$/, message: '只能为数字', trigger: 'blur' },
          ],
          unit: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          price: [
            { required: true, message: '不能为空', trigger: 'blur' },
          ],
          from: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],
          pay: [
            { required: true, message: '不能为空', trigger: 'change' },
          ],

    }
    }
  },
  props: ["visible"],
  computed:{
    ...mapState(["row"]),
  },
  watch:{
    visible(){
        const {name,start,end,cargo,count,unit,price,from,pay}=this.row
        this.ruleForm={name,start,end,cargo,count,unit,price,from,pay}
        console.log(this.ruleForm)
    }
  },
  methods: {
    close() {
      this.$emit("hide");
      this.$refs.ruleForm.resetFields()
      this.removeRow()   
    },
    save(){
        this.$refs.ruleForm.validate((valid)=>{
            if (valid) {
                         post("/addOrder",this.ruleForm).then(()=>{
                            this.$notify({
                                            title: '创建成功',
                                            type: 'success'
                                        });
                         })
                         this.close()
                         this.$emit("reload")  
                        
                       } 
            })
    },
    ...mapMutations(["removeRow"])
    
  },
};
</script>

<style lang="less" scoped>
</style>