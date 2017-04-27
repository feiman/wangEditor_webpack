/**
 * Created by allen on 17-4-27.
 */

var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var path = require('path');
var baseConfig = require('./webpacak.base.conf');
// 生成html
var HtmlWebpackPlugin = require('html-webpack-plugin');
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = function (env) {
    return webpackMerge(baseConfig(env), {
        devtool: 'cheap-module-source-map',

        /* server */
        devServer: {    // 设置本地Server;
            contentBase: path.join(__dirname, '/../dist'),  // 设置启动文件目录;
            host: 'localhost', // 主机或IP
            port: 8888,      // 设置端口号；
            compress: true, // 设置gzip压缩;
            inline: true,  // 开启更新客户端入口(可在package.json scripts 里设置 npm run xxx);
            // ？？？？ hot 设在这里npm run dev 是空白页面,网上有建议写在package.json
            // hot: true,    // 设置热更新(可在package.json scripts 里设置 npm run xxx);
            open: true, // 打开浏览器
        },


        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('dev')
                }
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new FriendlyErrorsPlugin(),

            /*编译生成html代码并在html中插入<script>标签*/
            new HtmlWebpackPlugin({
                favicon: path.join(__dirname, '../src/favicon.ico'),
                filename: path.resolve(__dirname + '/../dist/index.html'),   // 目标文件
                template: path.resolve(__dirname + '/../src/index.html'), //模板文件
                inject: 'body', // 要把script插入到标签里
                // hash: true,  //代表js文件后面会跟一个随机字符串,解决缓存问题
                // chunks: ["index"], // chunks这个参数告诉插件要引用entry里面的哪几个入口
            }),
        ]
    })
}