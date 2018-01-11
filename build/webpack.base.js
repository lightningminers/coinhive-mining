const path = require('path');

function resolve(dir){
  return path.join(__dirname,'..',dir)
}

let config = {
  entry: {
    app: './src/app.js',
    vendor: ['react','react-dom']
  },
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  devtool: "source-map",
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      },
      {
        test: /\.jsx$/, 
        exclude: /node_modules/, 
        loader: "babel-loader" 
      }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../src'),
    ],
    extensions: ['.js','.json','.jsx','.less']
  }
};

module.exports = config;