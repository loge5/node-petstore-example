const { describe, it, expect } = require('@jest/globals')
const MockDatabase = require('./MockDatabase')

describe('MockDatabase', () => {
  it('should be defined', () => {
    expect(MockDatabase).toBeInstanceOf(Function)
  })
})
