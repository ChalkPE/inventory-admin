module.exports = {
  use: [
    '@neutrinojs/standardjs',

    ['@neutrinojs/vue', {
      html: {
        title: 'inventory-admin'
      },
      devServer: {
        proxy: { '**': 'http://localhost:8080' }
      }
    }]
  ]
}
