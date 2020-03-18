const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const Pet = require('./Pet')

describe('Pet', () => {
  it('should be defined', () => {
    expect(Pet).to.be.a('Function')
  })
})
