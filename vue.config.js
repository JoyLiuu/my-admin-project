const { defineConfig } = require('@vue/cli-service')

const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  // 部署应用包时的基本 URL,用法和 webpack 本身的 output.publicPath 一致
  // publicPath: './',
  // // 输出文件目录
  outputDir: 'dist',
  // // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // // 是否使用包含运行时编译器的 Vue 构建版本
  // runtimeCompiler: false,
  // // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: false,
  // // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  // integrity: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hot: false,
    // http 代理配置
    proxy: {
      '/api': {
        target: 'http://47.108.205.158/',
        // target: 'http://127.0.0.1:3000/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    // before: (app) => {}
  },
  // webpack相关配置
  chainWebpack(){
    return {
      resolve: {
        alias: {
          '~': resolve('.'),
          '@': resolve('src'),
        },
      },
    }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      config.mode = 'production'
    } else {
      // 开发环境
      config.mode = 'development'
    }
  },
  // // 第三方插件配置
  // pluginOptions: {
  //
  // }
})
