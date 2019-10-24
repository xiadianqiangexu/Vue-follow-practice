### 资源准备
+ svg图片生成字体图标
```
    https://icomoon.io

    选择相应图标generate之后下载就好，也可以import Icon自己需要的图标generate
    下载解压之后会包含有一个selection文件将这个文件import Icon操作后会返回你当时选择的图标
```
+ json-server将一个json文件托管成api
+ 创建一个存放mock项目的文件夹
    ```
        mkdir mock_server
    ```
+ 初始化
    ```
        cd mock_server
        npm init
        一路回车
    ```
+ 安装依赖
    ```
        npm install json-server --save
    ```
+ 新建实例
    ```
        mock_server文件夹下新建两个文件，server.js用来启用服务,db.js用来用来存放数据
    ```
+ db.js
    ```
        const data ={...};
        module.exports = data;
    ```
+ server.js
    ```
        const JsonServer = require('json-server');
        const data =require('./db.js');

        const server = JsonServer.create();
        const router = JsonServer.router(data);
        const middleware = JsonServer.defaults();

        server.use(middleware);
        server.use(router);
        server.use(JsonServer.bodyParser);

        server.listen({
            host:'127.0.0.1',
            port:'8858'
        },function(){
            console.log('Json-server is running ~');
        }); 
    ```
+ 启动
    ```
        在终端mock_server目录下敲入：node server
        然后到localhost:8858端口下查看数据
    ```
+ less包依赖
    ```
        npm install less less-loader  --save--dev
        在webpack.base.conf.js文件中的rules下添加规则
        {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
        }
        尤其注意less的语法
    ```

### 注意事项
+ 路径
    ```
        在js文件中上级目录是./
        在vue文件中上级目录是../
    ```    
+ div不显示背景色,背景图,样式无效
    ```
        标签层级问题。。。
    ```
+ 跨域解决方式之一--代理服务器
    ```
        因为需要使用axios为8080端口的vue服务请求8858端口的mock服务，即涉及到跨域问题
    ```
    + 打开config/index.js
    + 找到dev下面的proxyTable
        ```
            proxyTable: {
                            '/api':{
                                target:'http://localhost:8858',
                                changeOrigin:true,
                                // 如果请求跨域需要加上changeOrigin
                                pathRewrite:{
                                    '/api':'/'
                                    // 因为在实际环境下是没有api字段出现的，所以将该字段重写
                                }
                            }
                            // 凡是以api开头的都会使用代理服务器发送请求
                        },
            详细参见github上的http-proxy-middleware
        ```
    + 在header中定义数据接收方法
    + 启动mock
        ```
            node server.js
        ```
    + 重启vue更新配置
    + 如果仍然不能接受到跨域数据
        ```
            确定关闭vue和mock服务，考虑重启
            先启动mock服务，再启动vue服务
        ```
    + 如果还是失败
        ```
            可能是系统觉得你太辛苦了，建议休息一两天重复执行上面步骤。。。
        ```
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