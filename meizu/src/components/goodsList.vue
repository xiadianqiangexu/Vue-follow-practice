<template>
   <ul class="clearfx">
       <li class="goods-list" v-for="(item,index) in data" :key="index" :class="{'last-child':(index + 1)%4 === 0}">
           <a :href="item.href">
               <img :src="item.goodsUrl" alt="" class="goods-img">
               <div class="goods-name">{{item.goodsName}}</div>
               <div class="goods-desc">{{item.goodsDesc}}</div>
               <div class="goods-price">
                   <i>￥</i>
                   {{item.goodsPrice}}
                   <span v-if="item.lower">起</span>
                   <span v-if="item.oldPrice" class="goods-oldPrice">{{item.oldPrice}}</span>
               </div>
           </a>
           <div v-if="item.newProduct" class="goods-new">新品</div>
       </li>
   </ul>
</template>

<script>
export default {
    name: 'goods-list',
    props:{
        data: {
            type:Array,
            default(){
                return []
            }
        },
    }
}
</script>

<style lang="less" scoped>
    .goods-list{
        float:left;
        width:303px;
        height:400px;
        background-color: #fff;
        cursor:pointer;
        //鼠标悬浮上会有一个手指的形状
        transition: all  .3s ease;
        position:relative;
        margin-top:10px;
        margin-right: 9px;
        overflow: hidden;
        //多出部分隐藏
        text-align: center;

        &:hover{
            box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
        }
        //悬浮事件阴影
        &.last-child{
            margin-right: 0;
        }
        .goods-img{
            height: 230px;
        //不设置宽度的原因是防止图片比例变形，只设置高度，图片会根据原比例自动给出宽度
            margin-top: 30px;
        }
        .goods-name{
            margin-top: 30px;
            margin-bottom: 2px;
            color:#333;
            font-size: 16px;
        }
        .goods-desc{
            font-size:14px;
            color:#999;
        }
        .goods-price{
            position: relative;
            display: inline-block;
            padding-left: 14px;
            font-size: 22px;
            color:#c00;

            i{
                font-style: normal;
                font-size: 14px;
                position: absolute;
                left:0;
                top:5px;
            }
        }
        .goods-oldPrice{
            text-decoration: line-through;
            color:#666;
            font-size: 14px;
            margin-left:8px;
        }
        .goods-new{
            position: absolute;
            left: 30px;
            top:30px;
            width:60px;
            line-height:60px;
            text-align: center;
            border-radius: 50%;
            background: linear-gradient(120deg,#2e74f6,#56bdf9);
            color:#fff;
        }
    }
</style>