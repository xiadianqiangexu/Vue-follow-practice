### 轮播实现
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
        //第二个li标签是防止出现动画回滚产生的不适感
        //思路是在最后一个图片停止渲染并且将渲染序号调回第一张图片，由于两张图片一样不易察觉
    </ul>
    <ul class="swiper-pagination">
        <li v-for="(item,index) in data" :key="index" @click="changeImg(index)" :class="{'active':activeIndex === index}"></li>
        //当激活索引等于对应序号时给与相应class渲染
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
    //定义默认数据值
    data () {
        return{
            activeIndex:0,
            timer:null,
            haveDuration:true
        }
    },
    //activeIndex:
    //timer:
    //haveDuration:判断是否给与渲染时间，最后一张图不给渲染时间
    computed: {
        swiperSize () {
            return {
                width:`${this.width}px`,
                height:`${this.height}px`
            }
        },
        //swiperSize用于计算出显示图片的区域大小
        listWarpper () {
            return {
                width: `${(this.data.length + 1) * this.width}px`,
                height: `${this.height}px`,
                transform:`translateX(-${this.activeIndex * this.width}px)`,
                transitionDuration: this.haveDuration ? '.3s' : ''
            }
        }
        //列表滑动，一张图片的特定区域设置为显示（通常为一个页面大小）图片长度为索引上先*一个页面宽
        //通过将不同的图片移动到显示区域内实现更换图片的效果（其他区域看不见）
        //tran选择是否给与渲染时间
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
        //当激活序号为data中最后一个序号时，将索引序号重置为0，不做渲染动画
        //否则三秒过渡渲染动画，索引自增
        changeImg (index) {
            this.activeIndex = index
            this.haveDuration = true
        },
        //点击改变图片，将索引变为点击索引，渲染设定为是
        setDuration () {
            if(this.activeIndex === this.data.length)
            {
                this.activeIndex = 0
                this.haveDuration = false
            }
        }
        //当激活索引与data长度相等，即最后一条数据时，渲染设定为否
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
                    //颜色渐变
                    border: 1px solid #fff;
                }
            }
        }
    }
</style>