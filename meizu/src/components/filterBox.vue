<template>
    <ul class="filter-box">
        <li class="box-item clearfix" v-for="(item,index) in data" :key="index">
            <div class="fl filter-title">
                {{item.name}}
            </div>
            <ul class="fl">
                <li class="filter-item fl" :class="{'active':activeFilters[item.key] === info.value}" v-for="(info,ii) in item.queryList" :key="ii" @click="changeFilter(item.key,info.value)">
                    {{info.name}}
                </li>
            </ul>
        </li>
    </ul>
</template>

<script>
export default {
    name:'filter-box',
    props:{
        data:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            activeFilters:{}
        }
    },
    methods: {
        changeFilter(key,val){
            this.$set(this.activeFilters,key,val)
            //直接赋值样式不会检测到数值改变，需要用到上面的set方法
            this.$emit('filter',this.activeFilters)
        }
    },
}
</script>

<style lang="less" scoped>
    .filter-box{
        background:white;
        padding: 15px 10px;
        border:1px solid #efefef;

        .box-item{
            line-height: 46px;
        }
        .filter-title{
            width:85px;
            padding-left: 10px;
            white-space: nowrap;
            color:#333;
            overflow: hidden;
        }
        .filter-item{
            cursor: pointer;
            margin-right: 62px;

            &.active{
                color:#00c3f5;
            }
        }
    }
</style>