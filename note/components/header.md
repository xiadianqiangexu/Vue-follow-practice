### 目录解析
+ asset目录用于存放资源文件，为了区分资源类别，我们选择新建子文件存储不同资源
    ```
        一般新建目录fonts，css，images
    ```
+ 视图文件为了便于管理存放在一个文件中
    ```
        src文件夹下新建view文件
    ```
+ header
    + 跨域获取mock中的数据
        + 安装axios
            ```
                npm install axios --save
                在header组件中引入axios
                import axios from 'axios'
            ```
        + 启动mock服务器
            ```
                cd mock_server
                node server.js
            ```
        + 在header组件中接收数据
            ```
                export default {
                    name:'Header',
                    data() {
                        return {
                            navData:[]
                        }
                    },
                    methods: {
                        async getNavData(){
                            const {data} = await axios.get('/api/nav')
                            this.navData =data
                        }
                    },
                }
                这里get后面的路径构成由代理服务器的默认请求字段和mock服务器下数据存在路径拼接而成
            ```
        + 该功能不会自动执行，增加触发事件
            ```
                export default {
                    name:'Header',
                    data() {
                        return {
                            navData:[]
                        }
                    },
                    mounted() {
                        this.getNavData
                    //当组件挂载时执行获取数据方法
                    },
                    methods: {
                        async getNavData(){
                            const {data} = await axios.get('/api/nav')
                            this.navData =data
                        }
                    },
                }
            ```
    + volecity库（编写动画）
        + 引入
             ```
                npm install velocity-animate --save

                在组件中引入
                import Velocity from 'velocity-animate';

                如果装载后出现问题可能是库安装的目录层级问题，也可能是需要重启服务
            ```
        + 执行
            + 渲染标签（一般使用该库渲染transition标签）
            ```
                 <transition name="nav">
                    <div class="nav-children" v-show="childrenShow" @mouseleave="hideChildren">
                        //通过v-show标签决定是否渲染
                        //通过鼠标移出事件取消渲染
                        <div class="children-wrapper">
                            <transition-group tag="ul" @enter="enter">
                            //通过enter事件触发渲染
                                <li class="children-item" v-for="(item,index) in childrenData" :key="item.pic" :data-index="index">
                                //key值不使用index是因为index不会被重复加载，而动画事件重复加载需要的是动态加载的数据
                                    <img :src="item.pic" alt="">
                                    <p>{{item.name}}</p>
                                    <p>{{item.price}}</p>
                                </li>
                            </transition-group>
                        </div>
                    </div>
                </transition>
            ```
            + 数据
            ```
                data() {
                    return {
                        navData:[],
                        childrenData:[],
                        //用于保存渲染数据
                        childrenShow:false
                        //bool值决定是否渲染
                    }
                },
            ```
            + 方法
            ```
                methods: {
                    async getNavData(){
                        const { data } = await axios.get('/api/nav')
                        this.navData = data
                    },
                    showChildren(item){
                        this.childrenData=item.children
                        this.childrenShow=true
                    },
                    hideChildren(){
                        this.childrenShow=false
                        this.childrenData=[]
                        //鼠标移开数据转变为0，为了使动画能够被再次渲染，数值不变的话，不会启用动画效果
                    },
                    enter(el){
                        const timeOut = el.dataset.index*150
                        // 时间延时定义为数据集合序列号*150毫秒
                        setTimeout(function () {
                            Velocity(el,{
                                'opacity':1,
                                //透明度变为1
                                'translateX':'-50px'
                                //横向移动距离
                            })
                        },
                        timeOut
                        )
                    }
                }
            ```
            + 相关样式
            ```
                .children-item{
                    opacity:0;
                    //透明度为0才会有渐现效果
                    width: 136px;
                    height: 145px;
                    display: inline-block;
                    text-align: center;
                    font-size: 12px;
                    color:#666;
                }
                .nav-enter-active{
                    height: 156px;
                    transition: height .3s ease-in-out;
                    //nav标签渲染会从上到下3秒内渲染出来
                }
            ``` 