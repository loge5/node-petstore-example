const { describe, it, expect } = require('@jest/globals')
const RequestParser = require('./RequestParser')
const Pet = require('./Pet')

const badRequest = message => expect.objectContaining({ status: 400, message })

describe('RequestParser', () => {
  it('should be defined', () => {
    expect(RequestParser).toBeInstanceOf(Function)
  })
  it('parsePetId should return the integer id', () => {
    expect(RequestParser.parsePetId({ petId: 2 })).toBe(2)
  })
  it.each([
    undefined,
    { petId: undefined },
    { petId: false },
    { petId: true },
    { petId: 'ABC' }
  ])('parsePetId(%p) should throw 400 Bad Request', (obj) => {
    expect(() => RequestParser.parsePetId(obj)).toThrow(badRequest('petId should be numeric'))
  })
  it('parsePet without body should throw 400 Bad Request', () => {
    expect(() => RequestParser.parsePet(undefined)).toThrow(badRequest('pet id should be numeric'))
  })
  it('parsePet should throw an error on invalid input', () => {
    const petObj = {
      id: 1,
      name: 'Horse',
      tag: 'Mammal'
    }
    expect(RequestParser.parsePet(petObj)).toBeInstanceOf(Pet)
    petObj.id = undefined
    expect(() => RequestParser.parsePet(petObj)).toThrow(/pet id/)
    petObj.id = 'ABC'
    expect(() => RequestParser.parsePet(petObj)).toThrow(/pet id/)
    petObj.id = 1
    petObj.name = undefined
    expect(() => RequestParser.parsePet(petObj)).toThrow(/pet name/)
    petObj.name = 'Horse'
    petObj.tag = undefined
    expect(() => RequestParser.parsePet(petObj)).toThrow(/pet tag/)
  })
})
