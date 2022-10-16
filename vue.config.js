const path = require('path')
module.exports = {

  //开启代理服务器(方式一)
  // devServer: {
  //   //请求服务器的地址
  //   proxy: 'http://erabbit.itheima.net/#/'
  // },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  }
}
