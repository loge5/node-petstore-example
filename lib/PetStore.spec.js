const { describe, it, expect, beforeEach } = require('@jest/globals')
const PetStore = require('./PetStore')
const Pet = require('./Pet')
const MockDatabase = require('./MockDatabase')
const httpError = require('../test/httpError')

const createPet = (id, name, tag) => {
  const pet = new Pet(id, name)
  pet.tag = tag
  return pet
}

describe('PetStore', () => {
  let petStore

  beforeEach(() => {
    petStore = new PetStore(new MockDatabase())
    petStore.insertPet(createPet(1, 'Penguin', 'Bird'))
    petStore.insertPet(createPet(2, 'Dog', 'Mammal'))
  })

  it('findPets (none exists) should return empty array', () => {
    expect(new PetStore(new MockDatabase()).findPets()).toEqual([])
  })
  it('findPets should return all Pets', () => {
    expect(petStore.findPets()).toHaveLength(2)
  })
  it('insertPet (new) should store the pet', () => {
    const pet = createPet(3, 'Horse', 'Mammal')
    petStore.insertPet(pet)
    expect(petStore.findPet(3)).toBe(pet)
  })
  it('insertPet (duplicate) should throw 409', () => {
    expect(() => petStore.insertPet(createPet(1, 'Penguin', 'Bird'))).toThrow(httpError(409, 'Conflict'))
  })
  it('findPet (not exists) should throw 404', () => {
    expect(() => petStore.findPet(3)).toThrow(httpError(404, 'Not Found'))
  })
  it('updatePet should store changes', () => {
    petStore.updatePet(1, createPet(1, 'Crow', 'Bird'))
    expect(petStore.findPet(1)).toEqual(createPet(1, 'Crow', 'Bird'))
  })
  it('updatePet (change petId) should throw 400', () => {
    expect(() => petStore.updatePet(1, createPet(2, 'Crow', 'Bird'))).toThrow(httpError(400, 'pet id is read only'))
  })
  it('deletePet (exists) should remove the pet', () => {
    petStore.deletePet(1)
    expect(() => petStore.findPet(1)).toThrow(httpError(404, 'Not Found'))
  })
  it('deletePet (not exists) should throw 404', () => {
    expect(() => petStore.deletePet(3)).toThrow(httpError(404, 'Not Found'))
  })
})
