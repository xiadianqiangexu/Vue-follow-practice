import Vue from 'vue'
const mutations = {
    ADD_SHOPCART(state,obj){
        let haveData = false;
        state.shopcartData.forEach((item)=>{
            if(item.id === obj.data.id)
            {
                haveData = true;
                item.count += obj.num;
            }
        })
        if(!haveData)
        {
            Vue.set(obj.data,'count',obj.num);
            state.shopcartData.push(obj.data);
        }
        console.log(state.shopcartData)
    }
};
export default mutations;