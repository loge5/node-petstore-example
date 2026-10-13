const { describe, it, expect } = require('@jest/globals')
const HttpError = require('./HttpError')

describe('HttpError', () => {
  it('should be defined', () => {
    expect(HttpError).toBeInstanceOf(Function)
  })
  it('constructer should not throw an error', () => {
    expect(() => { return new HttpError('test') }).not.toThrow()
  })
  it.each([
    [400, true],
    [499, true],
    [500, false],
    [503, false]
  ])('status %p should set expose to %p', (status, expose) => {
    expect(new HttpError('test', status).expose).toBe(expose)
  })
  it('getStatusList should returns list with OK status', () => {
    expect(HttpError.getStatusList()[200]).toBe('OK')
  })
  it('getHttpMessage should return string', () => {
    const error = new HttpError('test', 200)
    expect(error.getHttpMessage()).toBe('OK')
  })
  it('fromError (Error) should create HttpError', () => {
    const error = HttpError.fromError(new Error('test'), 200)
    expect(error).toBeInstanceOf(HttpError)
    expect(error.message).toBe('test')
    expect(error.getHttpMessage()).toBe('OK')
  })
  it('fromError (HttpError) should return same HttpError', () => {
    const original = new HttpError('test')
    expect(HttpError.fromError(original)).toBe(original)
  })
  it('fromStatus should return HttpError', () => {
    const error = HttpError.fromStatus(418)
    expect(error).toBeInstanceOf(HttpError)
    expect(error.message).toBe('I\'m a teapot')
  })
  it('getHttpMessageByStatus should find ok message', () => {
    expect(HttpError.getHttpMessageByStatus(200)).toBe('OK')
  })
  it('getHttpMessageByStatus should return unkown error on unkown status', () => {
    expect(HttpError.getHttpMessageByStatus(2000)).toBe('unkown error')
  })
})
