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
            <v-filter :data="filterListData" @filter="getQuery"></v-filter>
            <v-sort @getKey="getSortKey" @getStock="getSortStock"></v-sort>
            <v-category @clickItem="goToDetail" :data="categoryListData"></v-category>
            <v-recommend :data="recommendListData"></v-recommend>
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
import sortBox from '../components/sortBox.vue'
import recommendList from '../components/recommendList.vue'

export default {
    name:'category',
    components:{
        'v-header':Header,
        'v-footer':vFooter,
        'v-category':categoryList,
        'v-filter':filterBox,
        'v-sort':sortBox,
        'v-recommend':recommendList,
    },
    data() {
        return {
            categoryListData:[],
            filterListData:[],
            categoryListCopy:[],
            recommendListData:[],
            currentQuery:null,
            currentKey:null,
            currentStock:null,
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
        async getrecommendListData(){
            const { data } = await axios.get('/api/smartSale')
            this.recommendListData = data
            
        },
        getQuery(val)
        {
            this.currentQuery = val
            this.sortGoods()
        },
        getSortKey(key){
            this.currentKey = key
            this.sortGoods()
        },
        getSortStock(val){
            this.currentStock = val
            this.sortGoods()
        },
        sortGoods(){
            this.categoryListData = [].concat(this.categoryListCopy)
                if(this.currentQuery){
                    Object.keys(this.currentQuery).forEach((key)=>{
                        if(this.currentQuery[key]) {
                            this.categoryListData = this.categoryListData.filter((item)=>{
                            return item.features.indexOf(this.currentQuery[key]) >= 0
                        })
                    }
                })
            }
            if(this.currentStock)
            {
                this.categoryListData = this.categoryListData.filter((item)=>{
                    return item.available
                })
            }
            if(this.currentKey)
            {
                if(this.currentKey === 'recommend'){
                this.categoryListData.sort((a,b)=>{
                    return b.shelveTime - a.shelveTime
                })
                }else if(this.currentKey === 'new')
                {
                    this.categoryListData.sort((a,b)=>{
                        return b.publishedTime - a.publishedTime
                    })
                }else if(this.currentKey === 'low')
                {
                    this.categoryListData.sort((a,b)=>{
                        return b.goodsPrice - a.goodsPrice
                    })
                }else if(this.currentKey === 'high')
                {
                    this.categoryListData.sort((a,b)=>{
                        return a.goodsPrice - b.goodsPrice
                    })
                }
            }
        },
        goToDetail(item){
            this.$router.push({
                name:'Detail',
                params:{
                    id: item.id
                }
            })
        }
    },
    mounted() {
        this.getCategoryListData()
        this.getfilterListData()
        this.getrecommendListData()

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