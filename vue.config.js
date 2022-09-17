const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { defineConfig } = require('@vue/cli-service')
// const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'build',
  devServer: {
    port: '3200',
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  // 1. 对象会被直接合并merge
  configureWebpack: {
    resolve: {
      alias: {
        component: '@/conponent'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // 2. 函数，接受一个config
  // configureWebpack(config) {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     component: '@/component'
  //   }
  // }
  // 3. 链式调用
  // configureWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('component', '@/component')
  //     .set('view', '@/view')
  // }
})
