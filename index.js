const fs = require('fs')
const https = require('https')
const cryptoConstants = require('crypto').constants
const mainConfig = require('./config/main.config')
const createApp = require('./app')
const PetStore = require('./lib/PetStore')
const MockDatabase = require('./lib/MockDatabase')

const app = createApp({ petStore: new PetStore(new MockDatabase()) })
if (mainConfig.useHttps) {
  const credentials = {
    key: fs.readFileSync('/etc/ssl/server.key', 'utf8'),
    cert: fs.readFileSync('/etc/ssl/server.crt', 'utf8'),
    secureOptions: cryptoConstants.SSL_OP_NO_TLSv1 | cryptoConstants.SSL_OP_NO_TLSv1_1
  }
  const httpsServer = https.createServer(credentials, app)
  httpsServer.listen(mainConfig.port, function () {
    console.log(`${mainConfig.serviceName} is listening on https://127.0.0.1:${mainConfig.port}`)
  })
} else {
  app.listen(mainConfig.port, function () {
    console.log(`${mainConfig.serviceName} is listening on http://127.0.0.1:${mainConfig.port}`)
  })
}
