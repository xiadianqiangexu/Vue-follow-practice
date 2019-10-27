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