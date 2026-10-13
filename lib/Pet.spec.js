const { describe, it, expect } = require('@jest/globals')
const Pet = require('./Pet')

describe('Pet', () => {
  it('should be defined', () => {
    expect(Pet).toBeInstanceOf(Function)
  })
})
