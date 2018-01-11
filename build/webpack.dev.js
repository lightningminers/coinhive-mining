const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const base = require('./webpack.base');
const config = require('../config');
const autoprefixer = require('autoprefixer');

process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);

const env = process.env.NODE_ENV;

let devConfig = {};

if (env === 'development'){
  devConfig = Object.assign(base,{
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor','manifest']
      }),
      new webpack.HotModuleReplacementPlugin(),
      new DashboardPlugin()
    ]
  });
  devConfig.module.rules.push(
    {
      test: /\.less$/,
      use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "less-loader" // compiles Less to CSS
      },{
        loader: 'postcss-loader',
        options: {
          plugins: [autoprefixer({
            remove: false,
            browsers: ['last 2 versions', 'ie > 8', 'safari > 7'],
          })],
        }
      }]
    },
    {
      test: /\.css$/,
      use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: [autoprefixer({
            remove: false,
            browsers: ['last 2 versions', 'ie > 8', 'safari > 7'],
          })],
        }
      }]
    }
  );
  devConfig.output.publicPath = 'http://127.0.0.1:8080/';
  devConfig.entry = Object.assign({
    index: [
      'webpack-dev-server/client?http://127.0.0.1:8080/',
      'webpack/hot/dev-server'
    ]
  },devConfig.entry);
}

module.exports = devConfig;