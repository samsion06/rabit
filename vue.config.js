const path = require('path')
module.exports = {

  //开启代理服务器(方式一)
  // devServer: {
  //   //请求服务器的地址
  //   proxy: 'http://erabbit.itheima.net/#/'
  // },
  // 需要配置10kb下的图片打包成base64的格式
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10000 }))
    // 这个是给webpack-dev-server开启可IP和域名访问权限。
    config.devServer.disableHostCheck(true)
  },
//每个vue自动注入less
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  //这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  },
}
