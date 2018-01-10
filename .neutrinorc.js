module.exports = {
  use: [
    '@neutrinojs/standardjs',

    ['@neutrinojs/vue', {
      html: {
        title: 'inventory-admin'
      },
      style: {
        loaders: ['sass-loader']
      }
    }]
  ]
}
