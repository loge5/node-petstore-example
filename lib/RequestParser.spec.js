const { describe, it, expect } = require('@jest/globals')
const RequestParser = require('./RequestParser')
const Pet = require('./Pet')

describe('RequestParser', () => {
  it('should be defined', () => {
    expect(RequestParser).toBeInstanceOf(Function)
  })
  it('parsePetId should throw an error on invalid input', () => {
    expect(RequestParser.parsePetId({ petId: 2 })).toBe(2)
    expect(() => RequestParser.parsePetId(undefined)).toThrow(/petId/)
    expect(() => RequestParser.parsePetId({ petId: undefined })).toThrow(/petId/)
    expect(() => RequestParser.parsePetId({ petId: false })).toThrow(/petId/)
    expect(() => RequestParser.parsePetId({ petId: true })).toThrow(/petId/)
    expect(() => RequestParser.parsePetId({ petId: 'ABC' })).toThrow(/petId/)
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
