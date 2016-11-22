//-----------  Imports  -----------//

var Express       = require('express')
var webpack       = require('webpack')

var config        = require('../src/config')
var webpackConfig = require('./dev.config')

//-----------  Definitions  -----------//

var compiler = webpack(webpackConfig)

var host = config.host || 'localhost'
var port = (Number(config.port) + 1) || 3001

var serverOptions = {
  quiet       : true,
  noInfo      : true,
  hot         : true,
  inline      : true,
  lazy        : false,
  stats       : { colors: true },
  contentBase : 'http://' + host + ':' + port,
  publicPath  : webpackConfig.output.publicPath,
  headers     : { 'Access-Control-Allow-Origin': '*' },
}

var app = new Express()

//-----------  Server  -----------//

app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.listen(port, function onAppListening(err){
  if (err) {
    console.error(err)
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', port)
  }
})
