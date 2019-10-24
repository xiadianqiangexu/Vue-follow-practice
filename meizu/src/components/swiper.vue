<template>
    <div class="swiper" :style="swiperSize">
       <ul :style="listWarpper" @transitionen="setDuration" class="swiper-ul">
           <li class="swiper-list" v-for="(item,index) in data" :key="index">
               <a :href="item.href">
                   <img :style="swiperSize" :src="item.imgUrl" alt="">
               </a>
           </li>
           <li v-if="data.length > 0" class="swiper-list" :key="data.length + 1">
               <a :href="data[0].href">
                   <img :style="swiperSize" :src="data[0].imgUrl" alt="">
               </a>
           </li>
       </ul>
       <ul class="swiper-pagination">
           <li v-for="(item,index) in data" :key="index" @click="changeImg(index)" :class="{'active':activeIndex === index}"></li>
       </ul>
    </div>
</template>

<script>
export default {
    name:'swiper',
    props: {
        data: {
            type:Array,
            default () {
                return []
            }
        },
        height: {
            type:Number,
            default:500
        },
        width: {
            type:Number,
            default:1240
        },
        delay:{
            type:Number,
            default:5000
        }
    },
    data () {
        return{
            activeIndex:0,
            timer:null,
            haveDuration:true
        }
    },
    computed: {
        swiperSize () {
            return {
                width:`${this.width}px`,
                height:`${this.height}px`
            }
        },
        listWarpper () {
            return {
                width: `${(this.data.length + 1) * this.width}px`,
                height: `${this.height}px`,
                transform:`translateX(-${this.activeIndex * this.width}px)`,
                transitionDuration: this.haveDuration ? '.3s' : ''
            }
        }
    },
    methods: {
        setTimer () {
            clearInterval(this.timer)
            this.timer = setInterval(() => {
                if(this.activeIndex === (this.data.length))
                {
                    this.activeIndex = 0
                    this.haveDuration = false
                }else{
                    this.activeIndex++
                    this.haveDuration = true
                }
            }, this.delay);
        },
        changeImg (index) {
            this.activeIndex = index
            this.haveDuration = true
        },
        setDuration () {
            if(this.activeIndex === this.data.length)
            {
                this.activeIndex = 0
                this.haveDuration = false
            }
        }
    },
    mounted() {
        this.setTimer()
    },
}
</script>

<style lang="less" scoped>
    .swiper{
        width: 1240px;
        height: 500px;
        position: relative;
        overflow: hidden;
        //超出区域不显示
        .swiper-ul{
            font-size: 0;
        }
        .swiper-list{
            display: inline-block;
            //强制转变为行块元素，具备的行元素不换行的特点，也具备了块元素可以设置宽高的特点
            //通俗的讲就是原本不能设置宽高的元素可以设置宽高了
        }
        .swiper-pagination{
            position: absolute;
            left: 30%;
            bottom: 20px;

            li{
                display: inline-block;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                margin:0 5px;
                background-color:#fff;
                cursor:pointer;

                &.active{
                    background-color: transparent;
                    border: 1px solid #fff;
                }
            }
        }
    }
</style>