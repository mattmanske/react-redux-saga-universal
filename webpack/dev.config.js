//-----------  Includes  -----------//

var fs           = require('fs')
var path         = require('path')
var webpack      = require('webpack')
var precss       = require('precss')
var autoprefixer = require('autoprefixer')

//-----------  Definitions  -----------//

var host = (process.env.HOST || 'localhost')
var port = (+process.env.PORT + 1) || 3001

//-----------  Path Utilities  -----------//

var assetsPath = path.resolve(__dirname, '../../static/dist')
var context    = path.resolve(__dirname, '..')

function base(){
  const args = [context].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

var paths = {
  base   : base,
  client : base.bind(null, 'src'),
  dist   : base.bind(null, 'dist')
}

//-----------  Isomorphic Tools  -----------//

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

//-----------  Babel  -----------//

var babelrc = fs.readFileSync('./.babelrc')
var babelrcObject = {}

try {
  babelrcObject = JSON.parse(babelrc)
} catch (err){
  console.error('==>     ERROR: Error parsing your .babelrc.')
  console.error(err)
}

var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {}

//-----------  Plugins  -----------//

var combinedPlugins = babelrcObject.plugins || []
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins)

var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins})
delete babelLoaderQuery.env

//-----------  Plugins  -----------//

// Since we use .babelrc for client and server, and we don't want HMR enabled on the server, we have to add
// the babel plugin react-transform-hmr manually here.
// make sure react-transform is enabled

babelLoaderQuery.plugins = babelLoaderQuery.plugins || []
var reactTransform = null

for (var i = 0; i < babelLoaderQuery.plugins.length; ++i){
  var plugin = babelLoaderQuery.plugins[i]
  if (Array.isArray(plugin) && plugin[0] === 'react-transform')
    reactTransform = plugin
}

if (!reactTransform){
  reactTransform = ['react-transform', {transforms: []}]
  babelLoaderQuery.plugins.push(reactTransform)
}

if (!reactTransform[1] || !reactTransform[1].transforms)
  reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []})

//-----------  HMR  -----------//

reactTransform[1].transforms.push({
  transform : 'react-transform-hmr',
  imports   : ['react'],
  locals    : ['module']
})

//-----------  Exports  -----------//

module.exports = {
  devtool : null, //'inline-source-map',
  context : path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/client.js'
    ]
  },
  output: {
    path          : assetsPath,
    filename      : '[name]-[hash].js',
    chunkFilename : '[name]-[chunkhash].js',
    publicPath    : 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery)]},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.scss$/, loader: 'style!css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap' },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  postcss: function(){
    return [precss, autoprefixer]
  },
  progress: true,
  resolve: {
    root       : paths.client(),
    extensions : ['', '.json', '.js', '.jsx'],
    modulesDirectories: [
      'src',
      'node_modules'
    ],
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__      : true,
      __SERVER__      : false,
      __DEVELOPMENT__ : true,
      __DEVTOOLS__    : true // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
}
