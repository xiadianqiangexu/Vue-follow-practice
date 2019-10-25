import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './state'

Vue.use(Vuex)
const store = new Vuex.Store({
    //这边store要大写。。。为什么视频小写也可以。。。
    state,
    actions,
    getters,
    mutations,
})

export default store