const CracoLessPlugin = require("craco-less");
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");

module.exports = {
  babel: {
    presets: [],
    plugins: [],
  },
  // webpack配置
  webpack: {
    output: {
      filename: "[name].builde.js",
      chunkFilename: "[name].builde.js",
      path: path.resolve(__dirname, "build"),
    },
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    plugins: {
      add: [
        // 清除冗余文件
        new CleanWebpackPlugin({
          cleanStaleWebpackAssets: false,
          cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, "build")],
        }),
        // 替换antd中的moment为day
        new AntdDayjsWebpackPlugin(),
        // 全局模块-此处的全局模块名称需要在package.json中eslintConfig的global字段配置
        new webpack.ProvidePlugin({
          utils: [path.resolve(path.join(__dirname, "src/utils/index")),'default'],
        }),
        // sourceMap控制
        new webpack.SourceMapDevToolPlugin({
          test: [],
          include: [],
          exclude: [],
          module:false,
          columns:false,
        }),
        // 进度插件
        new webpack.ProgressPlugin({
          handler(percentage, message, ...args) {
            console.log(`编译进度：${(percentage * 100).toFixed(2)}%`);
          },
        }),
      ],
      remove: [],
    },
    optimization: {
      // 代码去重
      runtimeChunk: {
        name: "common",
      },
      // 优化大小
      minimizer: [
        new UglifyJsPlugin({
          test: /\.js(\?.*)?$/i,
          parallel: 4,
          sourceMap: false,
        }),
      ],
    },
  },
  // craco插件-不等于webpack的插件，详情见：https://github.com/gsoft-inc/craco/blob/master/packages/craco/README.md#configuration-helpers
  plugins: [
    {
      // craco-less插件
      plugin: CracoLessPlugin,
      options: {
        // css modules必须配置在less配置前，防止污染
        cssLoaderOptions: {
          modules: {
            compileType: "module",
            auto: /\.module(s)?\.\w+$/i,
            localIdentName: "[path][name]_[local]_[hash:base64:5]",
            namedExport: true,
          },
          sourceMap: false,
        },
        lessLoaderOptions: {
          lessOptions: {
            modifyvar: {},
            javascriptEnabled: true,
          },
          sourceMap: false,
        },
      },
    },
  ],
  // 开发服务器
  devServer: {
    contentBase: "./build",
    hot: true,
    open: false,
    compress: true,
    port: 9000,
    before: function (app, server, compiler) {
      console.log(`-----服务器启动开始-------------`);
    },
    after: function (app, server, compiler) {
      console.log(`-----服务器启动完成-------------`);
    },
  },
};
