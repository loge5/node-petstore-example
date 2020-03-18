const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const RequestParser = require('./RequestParser')
const Pet = require('./Pet')

describe('RequestParser', () => {
  it('should be defined', () => {
    expect(RequestParser).to.be.a('Function')
  })
  it('parsePetId should throw an error on invalid input', () => {
    expect(RequestParser.parsePetId({ petId: 2 })).equals(2)
    expect(() => RequestParser.parsePetId(undefined)).to.throw(Error, /petId/)
    expect(() => RequestParser.parsePetId({ petId: undefined })).to.throw(Error, /petId/)
    expect(() => RequestParser.parsePetId({ petId: false })).to.throw(Error, /petId/)
    expect(() => RequestParser.parsePetId({ petId: true })).to.throw(Error, /petId/)
    expect(() => RequestParser.parsePetId({ petId: 'ABC' })).to.throw(Error, /petId/)
  })
  it('parsePet should throw an error on invalid input', () => {
    const petObj = {
      id: 1,
      name: 'Horse',
      tag: 'Mammal'
    }
    expect(RequestParser.parsePet(petObj)).is.instanceof(Pet)
    petObj.id = undefined
    expect(() => RequestParser.parsePet(petObj)).to.throw(Error, /pet id/)
    petObj.id = 'ABC'
    expect(() => RequestParser.parsePet(petObj)).to.throw(Error, /pet id/)
    petObj.id = 1
    petObj.name = undefined
    expect(() => RequestParser.parsePet(petObj)).to.throw(Error, /pet name/)
    petObj.name = 'Horse'
    petObj.tag = undefined
    expect(() => RequestParser.parsePet(petObj)).to.throw(Error, /pet tag/)
  })
})
