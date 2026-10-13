const { describe, it, expect } = require('@jest/globals')
const RequestParser = require('./RequestParser')
const Pet = require('./Pet')
const httpError = require('../test/httpError')

const validPet = { id: 1, name: 'Horse', tag: 'Mammal' }

describe('RequestParser', () => {
  it('should be defined', () => {
    expect(RequestParser).toBeInstanceOf(Function)
  })
  it('parsePetId should return the integer id', () => {
    expect(RequestParser.parsePetId({ petId: 2 })).toBe(2)
  })
  it.each([
    {},
    { petId: undefined },
    { petId: false },
    { petId: true },
    { petId: 'ABC' }
  ])('parsePetId(%p) should throw 400 Bad Request', (obj) => {
    expect(() => RequestParser.parsePetId(obj)).toThrow(httpError(400, 'petId should be numeric'))
  })
  it('parsePet without body should throw 400 Bad Request', () => {
    expect(() => RequestParser.parsePet(undefined)).toThrow(httpError(400, 'pet id should be numeric'))
  })
  it('parsePet should return a Pet on valid input', () => {
    expect(RequestParser.parsePet(validPet)).toEqual(Object.assign(new Pet(1, 'Horse'), { tag: 'Mammal' }))
  })
  it.each([
    [{ id: undefined }, 'pet id should be numeric'],
    [{ id: 'ABC' }, 'pet id should be numeric'],
    [{ name: undefined }, 'pet name should be a string'],
    [{ tag: undefined }, 'pet tag should be a string']
  ])('parsePet with %p should throw 400 Bad Request', (change, message) => {
    expect(() => RequestParser.parsePet({ ...validPet, ...change })).toThrow(httpError(400, message))
  })
})
