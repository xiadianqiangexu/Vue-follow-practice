<template>
    <div>
        <v-header></v-header>
        <div class="category-wrapper">
            <div class="bread">
                <span>首页</span>
                <span class="arrow"> > </span>
                <span>全部</span>
                <span class="arrow"> > </span>
                <span class="last-bread">手机</span>
            </div>
            <v-filter :data="filterListData" @filter="getResult"></v-filter>
            <v-category :data="categoryListData"></v-category>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import axios from 'axios'
import Header from '../components/header.vue'
import vFooter from '../components/footer.vue'
import categoryList from '../components/categoryList.vue'
import filterBox from '../components/filterBox.vue'

export default {
    name:'category',
    components:{
        'v-header':Header,
        'v-footer':vFooter,
        'v-category':categoryList,
        'v-filter':filterBox,
    },
    data() {
        return {
            categoryListData:[],
            filterListData:[],
            categoryListCopy:[],
        }
    },
    methods: {
        async getCategoryListData(){
            const { data } = await axios.get('/api/categoryList')
            this.categoryListData = data
            this.categoryListCopy = [].concat(data)
            //不能使用等号，否则原数据和复制数据变化会同步
        },
        async getfilterListData(){
            const { data } = await axios.get('/api/queryList')
            this.filterListData = data
            
        },
        getResult(val){
            this.categoryListData = [].concat(this.categoryListCopy)
            Object.keys(val).forEach((key)=>{
                this.categoryListData = this.categoryListData.filter((item)=>{
                    return item.features.indexOf(val[key]) >= 0
                })
            })
        }
    },
    mounted() {
        this.getCategoryListData()
        this.getfilterListData()
    },
}
</script>

<style lang="less" scoped>
    .category-wrapper{
        width:1240px;
        margin:0 auto;
        padding-bottom: 60px;
    }
    .bread{
        height:40px;
        line-height: 40px;

        .arrow, .last-bread {
            color:#999;
        }
    }
</style>