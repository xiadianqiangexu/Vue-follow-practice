import Vue from 'vue'
import Router from 'vue-router'
import Index from '../view/index'
import Category from '../view/category'
import Detail from '../view/detail.vue'
// import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path:'/',
      name:'Index',
      component:Index
    },
    {
      path:'/category/:id?',
      //:id? 表示有没有id都可以
      name:'Category',
      component:Category
    },
    {
      path:'/detail/:id',
      name:'Detail',
      component:Detail
    },
  ]
})
