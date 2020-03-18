const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const https = require('https')
const cryptoConstants = require('crypto').constants
const mainConfig = require('./config/main.config')
const HttpError = require('./lib/HttpError')

const app = express()
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use('/', express.static('./swaggerui-dist'))
app.use('/pets', require('./routes/pets'))
app.use(function (req, res, next) {
  console.warn('Route Not Found: ' + req.url)
  res.status(404).json({ code: 404, message: 'Not Found' })
})
app.use(function (err, req, res, next) {
  if (err instanceof HttpError) {
    // don't expose internal errors because of security
    if (err.status >= 400 && err.status < 500) {
      console.warn(err.toString())
      res.status(err.status).json({ code: err.status, message: err.message })
    } else {
      console.error(err.toString())
      res.status(err.status).json({ code: err.status, message: err.getHttpMessage() })
    }
  } else {
    console.error(err)
    res.status(500).json({ code: 500, message: 'Internal Server Error' })
  }
})
app.set('etag', false)
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
