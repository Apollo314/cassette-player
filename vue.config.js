module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/cassette-player/'
      : '/',
    devServer: {
      compress: true,
      disableHostCheck: true,   // That solved it
    }
  }
  
