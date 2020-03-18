const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const HttpError = require('./HttpError')

describe('HttpError', () => {
  it('should be defined', () => {
    expect(HttpError).to.be.a('function')
  })
  it('constructer should not throw an error', () => {
    expect(() => { return new HttpError('test') }).to.not.throw(Error)
  })
  it('getStatusList should returns list with OK status', () => {
    expect(HttpError.getStatusList()[200]).equals('OK')
  })
  it('getHttpMessage should return string', () => {
    const error = new HttpError('test', 200)
    expect(error.getHttpMessage()).equals('OK')
  })
  it('fromError (Error) should create HttpError', () => {
    const error = HttpError.fromError(new Error('test'), 200)
    expect(error).instanceof(HttpError)
    expect(error.message).equals('test')
    expect(error.getHttpMessage()).equals('OK')
  })
  it('fromError (HttpError) should return same HttpError', () => {
    const error = HttpError.fromError(new HttpError('test'))
    expect(error).instanceof(HttpError)
    expect(error).equals(error)
  })
  it('fromStatus should return HttpError', () => {
    const error = HttpError.fromStatus(418)
    expect(error).instanceof(HttpError)
    expect(error.message).equals('I\'m a teapot')
  })
  it('getHttpMessageByStatus should find ok message', () => {
    expect(HttpError.getHttpMessageByStatus(200)).equals('OK')
  })
  it('getHttpMessageByStatus should return unkown error on unkown status', () => {
    expect(HttpError.getHttpMessageByStatus(2000)).equals('unkown error')
  })
})
