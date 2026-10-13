const path = require('path')
const express = require('express')
const HttpError = require('./lib/HttpError')
const petsRouter = require('./routes/pets')

const bodyLimit = '100kb'

/**
 * @param {object} deps
 * @param {import('./lib/PetStore')} deps.petStore
 * @returns {import('express').Express}
 */
const createApp = ({ petStore }) => {
  const app = express()
  app.set('etag', false)
  app.use(express.urlencoded({ extended: true, limit: bodyLimit }))
  app.use(express.json({ limit: bodyLimit }))
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })
  app.use('/', express.static(path.join(__dirname, 'swaggerui-dist')))
  app.use('/pets', petsRouter(petStore))
  app.use(function (req, res, next) {
    next(HttpError.fromStatus(404))
  })
  app.use(function (err, req, res, next) {
    const status = err.status ?? 500
    if (status < 500) {
      console.warn(`${req.method} ${req.originalUrl}: ${err}`)
    } else {
      console.error(`${req.method} ${req.originalUrl}:`, err)
    }
    res.status(status).json({
      code: status,
      message: err.expose ? err.message : HttpError.getHttpMessageByStatus(status)
    })
  })
  return app
}

module.exports = createApp
