const webpack = require('webpack');
const chalk = require('chalk');

const webpackConfig = require('./webpack.prod');

webpack(webpackConfig, function(err, stats){
  if (err) {
    throw err
  }
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log(chalk.cyan('  Build complete.\n'))
  console.log(chalk.yellow(
    '  Tip: react bundle \n'
  ))
})