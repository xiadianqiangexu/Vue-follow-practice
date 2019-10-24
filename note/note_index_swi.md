### 图片透明渐变
<template>
    <div>
        <v-header></v-header>
        <div class="swiper-warpper">
            <v-swiper :data="swiperData"></v-swiper>
            <ul class="menus">
                <li v-for="(item,index) in menuData" :key="index">
                    <a href="item.href">{{item.name}}</a>
                </li>
            </ul>
        </div>
        <ul class="post-warpper clearfix">
            <li v-for="(item,index) in postData" :key="index">
                <a :href="item.href">
                <img :src="item.imgUrl" alt="">
                </a>
            </li>
        </ul>
        <div class="index-contain"></div>
        <div class="footer"></div>
    </div>
</template>
<script>
import axios from 'axios'
import Header from '../components/header.vue'
import Swiper from '../components/swiper.vue'

export default {
    name:'index',
    components:{
        'v-header':Header,
        'v-swiper':Swiper
    },
    data() {
        return {
            swiperData:[],
            menuData:[],
            postData:[]
        }
    },
    mounted() {
        this.getSwiperData()
        this.getMenuData()
        this.getPostData()
    },
    methods: {
        async getSwiperData(){
            const { data } =await axios.get('/api/advertise')
            this.swiperData = data
            // console.log(this.swiperData)
        },
        async getMenuData(){
            const { data } =await axios.get('/api/menu')
            this.menuData = data
        },
        async getPostData(){
            const { data } =await axios.get('/api/post')
            this.postData = data
            // console.log(this.postData)
        }
    },
}
</script>

<style lang="less" scoped>
    .swiper-warpper{
        width:1240px;
        height: 500px;
        position: relative;
        margin:0 auto;
        .menus{
            top: 0;
            left: 0;
            bottom: 0;
            position: absolute;
            width: 303px;
            background-color: rgba(0, 0, 0, .5);
            padding-top: 17px;

            li{
                height: 57px;
                line-height: 57px;
            }

            a{
                font-size: 16px;
                padding-left: 40px;
                color:#fff;
                transition:color .3s;

                &:hover{
                    color:#31a5e7;
                }
            }
        }
    }
    .post-warpper{
        width:1240px;
        margin: 10px auto 50px;

        li{
            float:left;
            width:303px;
            height:180px;
            margin-right: 9px;

            a{
            transition: opacity .3s ease-in-out;

            &:hover{
                opacity: .85;
                //透明度变为85%
            }
        }
            &:last-child{
                margin-right: 0;
            }
        }
    }
</style>