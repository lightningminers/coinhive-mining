const path = require('path')

module.exports = {
  build: {
    env: require('./prod.env')
  },
  dev: {
    env: require('./dev.env'),
    port: 8080
  }
}