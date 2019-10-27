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
