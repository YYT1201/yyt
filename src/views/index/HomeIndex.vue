<template>
    <div>
        <!-- 四个卡片 -->
        <el-row :gutter="24" style="margin-bottom: 20px;" class="total">
            <el-col :span="6">
                <el-card shadow="always" class="in" >
                    <div style="float: left;">
                        <p>本月进度</p>
                        <p style="font-weight: bold;">6588</p>
                        <p>
                            +20.12%
                            <span style="font-size: 12px;">与上个月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-tickets ico"></i>
                    <div style="clear: both;"></div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card shadow="always" class="out" >
                    <div style="float: left;">
                        <p>本月放款</p>
                        <p style="font-weight: bold;">1210000000</p>
                        <p>
                            -1.25%
                            <span style="font-size: 12px;">与上个月同比</span>
                        </p>
                    </div>
                    <i class="el-icon-date ico"></i>
                    <div style="clear: both;"></div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card shadow="always" class="allout" >
                    <div style="float: left;">
                        <p>累计进件</p>
                        <p style="font-weight: bold;">128700</p>
                        <p>
                            -11.88%
                            <span style="font-size: 12px;">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-document-copy ico"></i>
                    <div style="clear: both;"></div>
                </el-card>
            </el-col>

            <el-col :span="6">
                <el-card shadow="always" class="allin" >
                    <div style="float: left;">
                        <p>累计放款</p>
                        <p style="font-weight: bold;">923541684</p>
                        <p>
                            -2.08%
                            <span style="font-size: 12px;">与去年同比</span>
                        </p>
                    </div>
                    <i class="el-icon-coin ico"></i>
                    <div style="clear: both;"></div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 视觉可视化 -->
        <el-row :gutter="24" >
            <el-col :span="18">
                <el-card >  
                    <div slot="header">进件统计分析</div>
                    <div style="height: 240px;" ref="anmlis">内容</div>
                </el-card>
            </el-col>
            <el-col :span="6">
            <el-card >  
                    <div slot="header">进件统计分析</div>
                    <div style="height: 240px;" ref="pie">内容</div>
                </el-card>
            </el-col>
        </el-row>
        <!-- 操作表和日历 -->
        <el-row :gutter="24" class="mt">
            <el-col :span="16">
                <el-card>
                <el-timeline>
                    <el-timeline-item timestamp="2018/4/12" placement="top">
                    <el-card>
                        <h4>更新 Github 模板</h4>
                        <p>王小虎 提交于 2018/4/12 20:46</p>
                    </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card>
                        <h4>更新 Github 模板</h4>
                        <p>王小虎 提交于 2018/4/3 20:46</p>
                    </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                        <h4>更新 Github 模板</h4>
                        <p>王小虎 提交于 2018/4/2 20:46</p>
                    </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/3" placement="top">
                    <el-card>
                        <h4>更新 Github 模板</h4>
                        <p>王小虎 提交于 2018/4/3 20:46</p>
                    </el-card>
                    </el-timeline-item>
                    <el-timeline-item timestamp="2018/4/2" placement="top">
                    <el-card>
                        <h4>更新 Github 模板</h4>
                        <p>王小虎 提交于 2018/4/2 20:46</p>
                    </el-card>
                    </el-timeline-item>
                </el-timeline>
            </el-card>
            </el-col>
            <el-col :span="8">
                <el-card>
                <el-calendar v-model="value">
                </el-calendar>
            </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import {get} from "@/utils/http"
    export default {
        data(){
            return{
                value:new Date
            }
        },
        mounted(){
            this.drawline()
            this.drawpie()
        },
        methods:{
            async drawline(){
                        const {data}= await get("/line")
                        let keys=[]
                        let values=[]
                        for(let key in data){+
                            keys.push(key)
                            values.push(data[key])
                        }
                        var myChart = echarts.init(this.$refs.anmlis)
                        const option = {
                                    xAxis: {
                                        type: 'category',
                                        boundaryGap: false,
                                        data:keys
                                    },
                                    yAxis: {
                                        type: 'value'
                                    },
                                    series: [
                                        {
                                        data: values,
                                        type: 'line',
                                        smooth: true,
                                        areaStyle: {
                                            color:{
                                                
                                                        type: 'linear',
                                                        x: 0,
                                                        y: 0,
                                                        x2: 0,
                                                        y2: 1,
                                                        colorStops: [{
                                                            offset: 0, color: '#4f88ff' // 0% 处的颜色
                                                        }, {
                                                            offset: 1, color: 'white' // 100% 处的颜色
                                                        }],
                                                        global: false // 缺省为 false
                                                    }                         
                                        }
                                        }
                                    ]
                                    }
                                    myChart.setOption(option)
                                },
                    drawpie(){
                        var myChart = echarts.init(this.$refs.pie)
                        const option = {
                                    tooltip: {
                                        trigger: 'item'
                                    },
                                    series: [
                                        {
                                        name: 'Access From',
                                        type: 'pie',
                                        radius: ['40%', '70%'],
                                        avoidLabelOverlap: false,
                                        itemStyle: {
                                            borderRadius: 10,
                                            borderColor: '#fff',
                                            borderWidth: 2
                                        },
                                        label: {
                                            show: false,
                                            position: 'center'
                                        },
                                        emphasis: {
                                            label: {
                                            show: true,
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                            }
                                        },
                                        labelLine: {
                                            show: false
                                        },
                                        data: [
                                            { value: 1048, name: 'Search Engine' },
                                            { value: 735, name: 'Direct' },
                                            { value: 580, name: 'Email' },
                                            { value: 484, name: 'Union Ads' },
                                            { value: 300, name: 'Video Ads' }
                                        ]
                                        }
                                    ]
                                    };
                                    myChart.setOption(option)
                    }
            
                    
                 }
        

    }
</script>
<style lang="less" scoped>
.ico{
    float: right;
    font-size: 90px;
    color: rgba(255, 255, 255, 0.3);
}
.in{
    background: #4f88ff;
}
.out{
    background: #f46772;
}
.total{
    p{
    line-height: 30px;
    color: #fff;
    font-size: 16px;
}
}

.allin{
    background: #5050ff;
}
.allout{
    background: #f49b3b;
}
</style>