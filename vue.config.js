module.exports = {
  publicPath: './foo',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://music.qq.com'
      }
    }
  }
}
