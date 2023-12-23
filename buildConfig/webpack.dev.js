const { merge } = require("webpack-merge");
const path = require('path')
const defaultConfig = require("./webpack.config");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(defaultConfig, {
    // 压缩代码
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                mangle:true,
                compress: true,
                keep_classnames: true,
                keep_fnames: true,
            },
        })]
    },

    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        path: path.resolve('dist'),
        // 打包后文件的名称
        filename: "index.js"
    }
})
