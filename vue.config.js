const ImageminPlugin = require('imagemin-webpack-plugin').default
const ImageminWebp = require('imagemin-webp-webpack-plugin')
const ImageminMozJpeg = require('imagemin-mozjpeg')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  chainWebpack (config) {
    // Remove existing SVG rule which uses file-loader
    config.module.rules.delete('svg')

    // Use our loader instead
    config.module.rule('svg')
      .test(/\.svg$/)
      .use('vue')
      .loader('vue-loader')
      .end()
      .use('svg-to-vue-component')
      .loader('svg-to-vue-component/loader')

    // clear the existing entry point
    config
      .entry('main')
      .clear()

    // add your custom entry point
    config
      .entry('main')
      .add('./src/main.js')

    config
      .plugin('ImageminWebp')
      .use(ImageminWebp, [{
        test: /\.(jpg|png)$/i,
        // disable: process.env.NODE_ENV !== 'production', // Disable during development
        option: {
          quality: 85
        }
      }])

    config
      .plugin('ImageminPlugin')
      .use(ImageminPlugin, [{
        test: /\.(jpg|png)$/i,
        // disable: process.env.NODE_ENV !== 'production', // Disable during development
        pngquant: {
          quality: '100'
        },
        plugins: [
          ImageminMozJpeg({
            quality: 75,
            progressive: true
          })
        ]
      }])
  }
}
