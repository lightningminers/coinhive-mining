const webpack = require('webpack');
const base = require('./webpack.base');
const config = require('../config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

process.env.NODE_ENV = JSON.parse(config.build.env.NODE_ENV);

const env = process.env.NODE_ENV;

let proConfig = {};

const extractLess = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});

if (env === 'production'){
  proConfig = Object.assign(base,{
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor','manifest']
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      extractLess,
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: false,
        }
      })
    ]
  });
  proConfig.module.rules.push({
    test: /\.less$/,
    use: extractLess.extract({
        use: [{
            loader: "css-loader",
            options:{
                minimize: true //css压缩
            }
        }, {
            loader: "less-loader"
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer({
              remove: false,
              browsers: ['last 2 versions', 'ie > 8', 'safari > 7'],
            })],
          }
        }],
        // use style-loader in development
        fallback: "style-loader"
    })
  })
  proConfig.module.rules.push({
    test: /\.css$/,
    use: extractLess.extract({
        use: [{
            loader: "css-loader",
            options:{
                minimize: true //css压缩
            }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: [autoprefixer({
              remove: false,
              browsers: ['last 2 versions', 'ie > 8', 'safari > 7'],
            })],
          }
        }],
        // use style-loader in development
        fallback: "style-loader"
    })
  })
}

module.exports = proConfig;