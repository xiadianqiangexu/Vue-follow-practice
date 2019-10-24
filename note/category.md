### 路由编写
+ category.vue
    ```
        <template>
            <div>
                ???
            </div>
        </template>

        <script>
        export default {
            name:'category'
        }
        </script>

        <style lang="less" scoped>

        </style>
    ```
+ index.js
    ```
        导入路由
        import Category from '../view/category'

        routes: [
                    {
                    path:'/category/:id?',
                    name:'Category',
                    component:Category
                    }
                ]
    ```
+ header
    ```
        编写触发方法
        <ul class="header-nav fr">
            <li v-for="(item,index) in navData" :key="index" @mouseenter="showChildren(item)">
                <a href="javascript:;" @click="goToCategory" class="nav-item">{{item.name}}</a>
            </li>
        </ul>

        goToCategory(){
            this.$router.push({
                name:'Category'
            })
        }
    ```