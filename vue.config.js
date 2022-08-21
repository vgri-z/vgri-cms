const { defineConfig } = require('@vue/cli-service')
// const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'build',
  // 1. 对象会被直接合并merge
  configureWebpack: {
    resolve: {
      alias: {
        component: '@/conponent'
      }
    }
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
