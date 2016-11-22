//-----------  Imports  -----------//

var path              = require('path')
var webpack           = require('webpack')
var CleanPlugin       = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var strip             = require('strip-loader')

//-----------  Path Utilities  -----------//

var projectRootPath = path.resolve(__dirname, '../')
var assetsPath      = path.resolve(projectRootPath, './static/dist')

function base(){
  const args = [context].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

var paths = {
  base   : base,
  client : base.bind(null, 'src'),
  dist   : base.bind(null, 'dist')
}

//-----------  Assets  -----------//

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))

//-----------  Config  -----------//

module.exports = {
  devtool : null, //'source-map',
  context : path.resolve(__dirname, '..'),
  entry: {
    'main': [
      './src/client.js'
    ]
  },
  output: {
    path          : assetsPath,
    filename      : '[name]-[chunkhash].js',
    chunkFilename : '[name]-[chunkhash].js',
    publicPath    : '/dist/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
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
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
    new webpack.DefinePlugin({
      'process.env': {
        "NODE_ENV" : '"production"',
      },
      __CLIENT__      : true,
      __SERVER__      : false,
      __DEVELOPMENT__ : false,
      __DEVTOOLS__    : false
    }),
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    webpackIsomorphicToolsPlugin
  ]
}
