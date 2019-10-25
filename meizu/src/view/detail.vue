<template>
    <div class="bg-white">
        <v-header></v-header>
        <div class="detail-wrapper">
            <div class="bread">
                <span>首页</span>
                <span class="arrow"> > </span>
                <span>全部</span>
                <span class="arrow"> > </span>
                <span class="last-bread">手机</span>
            </div>
            <div class="clearfix">
                <div class="fl detail-images">
                    <v-image :data="infoData.colorImageUrls" type="big"></v-image>
                </div>
                <div class="fl detail-props">
                    <h1 class="prop-title">{{infoData.goodsName}}</h1>
                    <p class="prop-desc">{{infoData.goodsDesc}}</p>
                    <div class="prop-sale">
                        <span class="prop-name">价<span class="prop-space"></span>格：</span>
                        <span class="prop-price">￥{{infoData.goodsPrice}}</span>
                    </div>
                    <div>
                        <span class="prop-name">支<span class="prop-space"></span>持：</span>
                        <ul class="service-list">
                            <li class="list-item">
                                <i class="icon-font icon-check-circle"></i>百城速达
                            </li>
                            <li class="list-item">
                                <i class="icon-font icon-check-circle"></i>顺丰包邮
                            </li>
                            <li class="list-item">
                                <i class="icon-font icon-check-circle"></i>七天无理由退货
                            </li>
                        </ul>
                    </div>
                    <div>
                        <span class="prop-name">服<span class="prop-space"></span>务：</span>
                        <span>本商品魅族负责发货并提供售后服务</span>
                    </div>
                    <div>
                        <span class="prop-name">数<span class="prop-space"></span>量：</span>
                        <div class="clearfix prop-number">                        
                            <input type="number" class="fl prop-input" v-model="purchaseQuantity">
                            <div class="fl change-box">
                                <div class="change-value" @click="increase">+</div>
                                <div class="change-value" @click="decrease">-</div>
                            </div>
                        </div>
                    </div>
                    <div class="prop-buy">
                        <a href="javascript:;" class="btn danger mar20" @click="purchase">立刻购买</a>
                        <a href="javascript:;" class="btn success" @click="addShopcart">加入购物车</a>
                    </div>
                </div>
            </div>
            <div class="detail-info_wrapper"> 
                <div class="detail-info">
                    <a href="javascript:;" class="info-title">商品详情</a>
                </div>
                <img class="detail-images" :src="item" v-for="(item,index) in infoData.information" :key="index" alt="">
            </div>
        </div>
        <v-footer></v-footer>
    </div>
</template>

<script>
import axios from 'axios'
import vHeader from '../components/header'
import vFooder from '../components/footer'
import imageList from '../components/imageList'

export default {
    name:'detail',
    components:{
        'v-header':vHeader,
        'v-footer':vFooder,
        'v-image':imageList,
    },
    data() {
        return {
            infoData:{},
            purchaseQuantity:1,
        }
    },
    methods: {
        async getDetail(id){
            const { data } = await axios.get(`/api/categoryList/${id}`)
            //id是在router里路径最后的字符，名称可以变更
            this.infoData = data
        },
        increase(){
            this.purchaseQuantity = parseInt(this.purchaseQuantity) + 1
        },
        decrease(){
            if(this.purchaseQuantity > 1)
            {
                this.purchaseQuantity = parseInt(this.purchaseQuantity) - 1
            }
        },
        addShopcart(){
            this.$store.commit('ADD_SHOPCART',{
                data: this.infoData,
                num: parseInt(this.purchaseQuantity)
            })
        },
        purchase(){
            this.$store.commit('ADD_SHOPCART',{
                data: this.infoData,
                num: parseInt(this.purchaseQuantity)
            })
        }
    },
    mounted() {
        this.getDetail(this.$route.params.id)
    },
}
</script>

<style lang="less" scoped>
    .bread{
        height:40px;
        line-height: 40px;

        .arrow, .last-bread {
            color:#999;
        }
    }
    .detail-wrapper{
        width: 1240px;
        margin: 0 auto;

        .detail-images{
            width:495px;
        }
        .detail-props{
            width:675px;
            font-size: 12px;

            .prop-title{
                font-size: 24px;
                font-weight: 400px;
                color:#000;
            }

            .prop-desc{
                font-size: 16px;
                color:#e22841;
                margin-bottom: 15px;
            }

            .prop-name{
                padding:0 10px;
                //左右10填充
                line-height: 34px;
                .prop-space{
                    padding: 0 12px;
                } 
            }

            .prop-sale{
                height: 55px;
                background-color: #f5f5f5;
                margin-bottom: 26px;

                .prop-price{
                    color: #e02b41;
                    font-size: 24px;
                    line-height: 55px;
                }
            }

            .service-list{
                display: inline-block;

                .list-item{
                    display: inline-block;
                    margin-right: 20px;
                }

                i{
                    margin-right: 5px;
                    color:#00c3f5;
                }
            }

            .prop-number{
                display: inline-block;
                vertical-align: middle;

                .prop-input{
                    width: 53px;
                    height: 38px;
                    line-height: 38px;
                    border-color: 1px solid #dcdcdc;
                    color:#333;
                    text-align: center;
                }

                .change-box{
                    margin-left: 6px;
                }

                .change-value{
                    width: 20px;
                    height:16px;
                    font-size: 14px;
                    color:#666;
                    border:1px solid #dcdcdc;
                    line-height: 14px;
                    cursor: pointer;
                    text-align: center;

                    &:last-child{
                        margin-top:6px;
                    }
                }
            }

            .prop-buy{
                margin-top: 17px;

                .mar20{
                    margin-right: 20px;
                }
            }
        }
    }

    .detail-info_wrapper{
        font-size: 0;
        margin-top: 60px;
        margin-bottom: 80px;
        .detail-info{
            height: 62px;
            border-bottom: 1px solid #dcdcdc;
        }

        .info-title{
            font-size: 16px;
            height:62px;
            line-height: 62px;  
            color:#00c3f5;
            border-bottom: 1px solid #00c3f5;
            padding: 0 20px; 
            margin-bottom: -1px;
            box-sizing: border-box;
            display: inline-block;
        }

        .detail-images{
            width: 1240px;
        }
    }
    
    
    
    .bg-white{
        background-color: white;
    }
</style>