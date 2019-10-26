const getters = {
    isAllChecked(state){
        let checked = true
        state.shopcartData.forEach(item =>{
            if(!item.checked)
            {
                checked = false
            }
        })
        return checked
    },
    checkedGoodsTotal(state){
        let total = 0
        state.shopcartData.forEach(item =>{
            if(item.checked)
            {
                total += item.count
            }
        })
        return total
    },
    checkedGoodsPrice(state){
        let total = 0
        state.shopcartData.forEach(item =>{
            if(item.checked)
            {
                total += (item.count * item.goodsPrice)
            }
        })
        return total
    },
    shopcartTotal(state){
        let total = 0
        state.shopcartData.forEach(item =>{
                total += item.count
        })
        return total
    },
}
export default getters