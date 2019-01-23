module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/shared-mixin.scss";`
      }
    }
  },

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
  }
}
