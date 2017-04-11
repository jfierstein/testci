const debug = process.env.NODE_ENV !== "prod";
var webpack = require('webpack');
var path = require('path');
process.noDeprecation = true;
module.exports = {
  context: path.resolve(__dirname, './client'),
  devtool: debug ? "inline-sourcemap" : false,
  entry: "./js/client.js",
  module: {
    rules: [
      {
        test: /\.css?$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', ["es2015", { "modules": false }], 'stage-0'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './client/js'),
      path.resolve(__dirname, './node_modules')
    ]
  },
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: "client.min.js"
  },
  plugins: debug ? [
    new webpack.ProvidePlugin({
      React: 'react',
    })
  ] : [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('prod')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  ],
};