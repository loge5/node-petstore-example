const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const MockDatabase = require('./MockDatabase')

describe('MockDatabase', () => {
  it('should be defined', () => {
    expect(MockDatabase).to.be.a('Function')
  })
})
