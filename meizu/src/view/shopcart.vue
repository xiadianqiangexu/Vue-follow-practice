<template>
    <div>
        <v-header></v-header>
        <div class="shopcart-wrapper" v-if="shopcartData.length > 0"> 
            <table class="shopcart-header">
                <tr>
                    <td class="cart-select">
                        <input :checked="isAllChecked"  @click="checkAllGoods" type="checkbox" class="cart-checkbox">
                        <span>全选</span>
                    </td>
                    <td class="cart-name">商品</td>
                    <td class="cart-price">单位（元）</td>
                    <td class="cart-num">数量</td>
                    <td class="cart-sum">小计（元）</td>
                    <td class="cart-oper">操作</td>
                </tr>
            </table>
            <div class="shopcart-list">
                <table>
                    <tr v-for="(item,index) in shopcartData" :key="index" class="cart-product">
                        <td class="cart-select">
                            <input type="checkbox" :checked="item.checked" @click="checkedGoods(item.id)" class="cart-checkbox">
                            <img class="cart-img" :src="item.imageUrl" alt="">
                        </td>
                        <td class="cart-name">
                            <span class="cart-title">{{item.goodsName}}</span>
                            <span>{{item.goodsDesc}}</span>
                        </td>
                        <td class="cart-price">￥{{item.goodsPrice}}</td>
                        <td class="cart-num">
                            <div class="cart-input clearfix">
                                <button class="fl" @click="decrease(item.id)">-</button>
                                <input v-model="item.count" type="number" class="fl">
                                <button class="fl" @click="increase(item.id)">+</button>
                            </div>
                        </td>
                        <td class="cart-sum">￥{{item.goodsPrice * item.count}}</td>
                        <td class="cart-oper"> 
                            <i class="icon-font icon-close" @click="delGoods(item.id)"></i>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="clearfix shopcar-footer">
                <div class="fl">
                    <input :checked="isAllChecked"  @click="checkAllGoods" type="checkbox" class="cart-checkbox">
                    <span>全选</span>
                    <span class="footer-remove">删除选中的商品</span>
                    <span>共<span class="footer-number gray">{{shopcartTotal}}</span>件商品，已选<span class="footer-number blue">{{checkedGoodsTotal}}</span>件商品</span>
                </div>
                <div class="fr">
                    <span>已优惠<span class="footer-number red">0.00</span>元，合计（不含运费）:<span class="footer-num red footer-total">￥{{checkedGoodsPrice}}</span></span>
                    <a href="javascript:;" class="btn success" :class="{'cancel': checkedGoodsTotal <= 0}">去结算</a>
                </div>
            </div>
        </div>
        <div v-else class="shopcart-empty">
            <div class="empty-content">
                <div class="empty-left"></div>
                <div class="empty-right">
                    <p class="empty-desc">购物车内还没有商品赶紧去选购吧</p>
                    <a href="javacrtipt:;" class="btn success" @click="goToIndex">返回首页</a>
                </div>
            </div>
        </div>
        <v-footer></v-footer>
        <v-dialog :show.sync="dialogShow" title="提示" :width="500" @confirm="confirmDelete" @cancel="dialogShow = false">
            <div style="height: 120px;line-height: 120px">您确定删除该商品吗？</div>
        </v-dialog>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
//import { mapGetters } from 'vuex'
import vHeader from '../components/header'
import vFooter from '../components/footer'
import vDialog from '../components/dialog'

export default {
    name:'shopcart',
    components:{
        'v-header':vHeader,
        'v-footer':vFooter,
        'v-dialog':vDialog,
    },
    computed: {
        shopcartData(){
            return this.$store.state.shopcartData
        },
        ...mapGetters([
            'isAllChecked',
            'checkedGoodsTotal',
            'checkedGoodsPrice',
            'shopcartTotal',
        ]),
    },
    data() {
        return {
            dialogShow: false,
            currentId:null,
        }
    },
    methods: {
        ...mapMutations([
            'INCREASE_SHOPCART',
            'DECREASE_SHOPCART',
            'CHECK_GOODS',
            'CHECK_ALL_GOODS',
            'DEL_SHOPCART',
        ]),
        increase(id){
            this.INCREASE_SHOPCART(id)
            //等效下面
            // this.$store.commit('INCREASE_SHOPCART',id)
        },
        decrease(id){
            this.DECREASE_SHOPCART(id)
        },
        goToIndex (){
            this.$router.push({
                name:'Index'
            })      
        },
        checkedGoods (id){
            this.CHECK_GOODS(id)
        },
        checkAllGoods (){
            this.CHECK_ALL_GOODS(this.isAllChecked)
        },
        delGoods (id){
            this.dialogShow = true
            this.currentId = id
        },
        confirmDelete (){
            this.DEL_SHOPCART(this.currentId)
            this.dialogShow = false
        }
    },
}
</script>

<style lang="less" scoped>
    .shopcart-wrapper{
        width: 1240px;
        margin: 10px auto;

        .shopcart-header{
            height: 50px;
            background-color: #fff;
            border-bottom: 1px solid #efefef;
        }

        .cart-select{
            padding-left: 45px;
            text-align: left;
            width: 220px;

            .cart-img{
                width: 100px;
                height: 100px;
                margin-left: 35px;
                vertical-align: middle;
            }
        }

        .cart-checkbox{
            width: 18px;
            height: 18px;
            border-color: #bdbdbd;
            display: inline-block;
            background-color: #fff;
            border-radius: 2px;
            font-size: 10px;
            vertical-align: middle;
        }

        
        .cart-name{
            width: 270px;
            text-align: left;

            .cart-title{
                display: inline-block;
                width: 100%;
                overflow: hidden;
                //隐藏超出部分
                white-space: nowrap;
                //文本不换行
                text-overflow: ellipsis;
                //超出部分...表示
            }

            .cart-desc{
                color:#999;
            }
        }

        .cart-price{
            width: 220px;
            text-align: center;
        }

        .cart-num{
            width: 200px;
            text-align: center;
        }

        .cart-sum{
            width: 160px;
            text-align: center;
        }

        .cart-oper{
            width: 170px;
            padding-right: 40px;
            text-align: right;
        }

        .shopcart-list{
            background-color: #fff;
            margin-bottom: 10px;
        }

        .cart-product{
            height: 150px;
            border-top: 1px solid #efefef;

            &:last-child{
                border-bottom: 1px solid #efefef;
            }
        }

        .cart-input{
            width: 140px;
            height:38px;
            border: 1px solid #efefef;
            margin: 0 auto;
            border-radius: 4px;

            button{
                width: 38px;
                height: 38px;
                text-align: center;
                background: transparent;
                //背景色透明
                border: none;
                font-size: 20px;
                cursor: pointer;
            }

            input{
                width:58px;
                height: 35px;
                border: none;
                border-left: 1px solid #efefef;
                border-right: 1px solid #efefef;
                text-align: center;
            }
        }

        .shopcar-footer{
            height: 70px;
            line-height: 70px;
            background-color: #fff;
            padding: 0 45px;
            color: #666;
            
            .footer-remove{
                color: #999;
                margin: 0 30px 0 20px;
            }

            .footer-number{
                font-weight: bold;
                margin: 0 5px;

            }

            .gray{
                color: #333;
            }

            .blue{
                color: #00c3f5;
            }

            .red{
                color: #e02b41;
            }

            .footer-total{
                font-size: 20px;
                margin-right: 35px;
            }
        }
    }

    .shopcart-empty{
        width: 1240px;
        margin: 10px auto;
        background-color:#fff;
        display: table;
        height: 360px;

        .empty-content{
            display: table-cell;
            text-align: center;
            vertical-align:middle;
            //垂直对齐

        }

        .empty-left{
            display: inline-block;
            width: 100px;
            height: 114px;
            background: url('../assets/images/shopcart.png') no-repeat;
            margin-right: 30px;
            vertical-align: middle;
        }

        .empty-right{
            display: inline-block;
            vertical-align: middle;
            text-align: left;
        }

        .empty-desc{
            color: #666;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
        }
    }
</style>