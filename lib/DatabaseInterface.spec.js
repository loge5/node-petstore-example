const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const DatabaseInterface = require('./DatabaseInterface')

describe('DatabaseInterface', () => {
  it('should be defined', () => {
    expect(DatabaseInterface).to.be.a('Function')
  })
  it('abstract methods should throw error when not overriden', () => {
    const databaseInterface = new DatabaseInterface()
    expect(() => databaseInterface.delete()).to.throw(Error, 'called an abstract method')
    expect(() => databaseInterface.exists()).to.throw(Error, 'called an abstract method')
    expect(() => databaseInterface.find()).to.throw(Error, 'called an abstract method')
    expect(() => databaseInterface.findAll()).to.throw(Error, 'called an abstract method')
    expect(() => databaseInterface.save()).to.throw(Error, 'called an abstract method')
    expect(() => databaseInterface.delete()).to.throw(Error, 'called an abstract method')
  })
})
