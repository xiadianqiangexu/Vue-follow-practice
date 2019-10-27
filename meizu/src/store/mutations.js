//同步操作
import Vue from 'vue'
const mutations = {
    ADD_SHOPCART(state,obj){
        let haveData = false
        state.shopcartData.forEach((item)=>{
            if(item.id === obj.data.id)
            {
                haveData = true
                item.count += obj.num
            }
        })
        //如果该商品在购物车已存在直接修改数量，如果不存在增加商品并且修改数量
        if(!haveData)
        {
            Vue.set(obj.data,'count',obj.num)
            Vue.set(obj.data,'checked',true)
            state.shopcartData.push(obj.data)
        }
        // console.log(state.shopcartData)
    },
    DEL_SHOPCART(state,id){
        state.shopcartData.forEach((item,index) =>{
            if(item.id === id)
            {
                state.shopcartData.splice(index,1)
            }
        })
    },
    INCREASE_SHOPCART(state,id){
        state.shopcartData.forEach(item =>{
            if(item.id === id)
            {
                item.count++
            }
        })
    },
    DECREASE_SHOPCART(state,id){
        state.shopcartData.forEach(item =>{
            if(item.id === id && item.count > 1)
            {
                item.count--
            }
        })
    },
    CHECK_GOODS(state,id){
        state.shopcartData.forEach(item =>{
            if(item.id === id)
            {
                item.checked = !item.checked
            }
        })
    },
    CHECK_ALL_GOODS (state,checked){
        state.shopcartData.forEach(item =>{
            item.checked = !checked
        })
    },
    REMOVE_GOODS(state){
        state.shopcartData = state.shopcartData.filter(item => !item.checked)
    }

};
export default mutations;