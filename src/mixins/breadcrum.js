export default{
        data(){
            return{
                breadList:[]
            }
        },
        created(){
            this.getbread()
        },
        methods:{
            getbread(){
                this.breadList=this.$route.meta.bread||[]
            }
        }
}