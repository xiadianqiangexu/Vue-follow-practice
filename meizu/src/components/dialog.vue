<template>
    <transition name="dialog">
        <div class="dialog-mask" v-show="show">
            <div class="dialog-box">
                <div class="dialog-wrapper" :style="dialogBox">
                    <div class="dialog-header" :class="{'dialog-title':title}">
                        {{title}}
                        <i class="icon-font icon-close dialog-close" @click="close"></i>
                    </div>
                    <div :style="dialogContent">
                        <slot></slot>
                    </div>
                    <div class="dialog-footer" v-if="confirmButtonShow || cancelButtonShow">
                        <button v-show="confirmButtonShow" class="btn success wd100 mr20" @click="confirm">{{confirmButtonText}}</button>
                        <button v-show="cancelButtonShow" class="btn cancel wd100" @click="cancel">{{cancelButtonText}}</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name:'vDialog',
    props: {
        show:{
            type:Boolean,
            default:false
        },
        height:{
            type:Number,
            default:280
        },
        width:{
            type:Number,
            default:760
        },
        title:{
            type:String,
            default:''
        },
        confirmButtonShow:{
            type:Boolean,
            default:true
        },
        cancelButtonShow:{
            type:Boolean,
            default:true
        },
        confirmButtonText:{
            type:String,
            default:'确定'
        },
        cancelButtonText:{
            type:String,
            default:'取消'
        }
    },
    computed: {
        dialogBox(){
            return {
                width:`${this.width}px`
            }      
        },
        dialogContent(){
            return {
                height:`${this.height}px`
            }      
        }
    },
    methods: {
        close(){
            this.$emit('update:show',false)
        },
        confirm(){
            this.$emit('confirm')
        },
        cancel(){
            this.$emit('cancel')
        }
    },
}
</script>

<style lang="less" scoped>
    .dialog-mask{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(153,153,153,.6);
        display: table;
        
        .dialog-box{
            display: table-cell;
            vertical-align: middle;
        }

        .dialog-wrapper{
            margin: 0 auto;
            background-color: #fff;
            text-align: center;
        }

        .dialog-header{
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 4px 4px 0 0;
            font-size: 18px;
            font-weight: bold;
            color: #333;
            position: relative;
        }

        .dialog-title{
            border-bottom: 1px solid #efefef;
        }

        .dialog-close{
            position: absolute;
            right:26px;
            color: #bdbdbd;
            top: 16px;
        }

        .dialog-footer{
            padding-bottom: 30px;
        }

        .mr20{
            margin-right: 20px;
        }

        .wd100{
            width: 100px;
        }
    }

    .dialog-enter-active{
        transition: opacity .3s;

    }
        .dialog-enter{
            opacity: 0;
        }
</style>