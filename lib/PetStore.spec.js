const { describe, it, expect } = require('@jest/globals')
const PetStore = require('./PetStore')
const Pet = require('./Pet')
const HttpError = require('./HttpError')
const MockDatabase = require('./MockDatabase')
const mockDatabase = new MockDatabase()
let petStoreTest

describe('PetStore', () => {
  it('should be defined', () => {
    expect(PetStore).toBeInstanceOf(Function)
  })
  it('constructor should resolve', () => {
    petStoreTest = new PetStore(mockDatabase)
  })
  it('findPets (none exists) should return array', () => {
    const pets = petStoreTest.findPets()
    expect(pets).toBeInstanceOf(Array)
    expect(pets).toHaveLength(0)
  })
  it('insertPet (new) should resolve', () => {
    const pet = new Pet(1, 'Penguin')
    pet.tag = 'Bird'
    petStoreTest.insertPet(pet)
    const pet2 = new Pet(2, 'Dog')
    pet2.tag = 'Mammal'
    petStoreTest.insertPet(pet2)
  })
  it('insertPet (duplicate) should throw error', () => {
    const pet = new Pet(1, 'Penguin')
    pet.tag = 'Bird'
    expect(() => petStoreTest.insertPet(pet)).toThrow(HttpError)
    expect(() => petStoreTest.insertPet(pet)).toThrow('Conflict')
  })
  it('findPets should return all Pets', () => {
    const pets = petStoreTest.findPets()
    expect(pets).toBeInstanceOf(Array)
    expect(pets).toHaveLength(2)
  })
  it('findPet (not exists) should throw error', () => {
    expect(() => petStoreTest.findPet(3)).toThrow(HttpError)
    expect(() => petStoreTest.findPet(3)).toThrow('Not Found')
  })
  it('updatePet should store changes', () => {
    const pet = new Pet(1, 'Crow')
    pet.tag = 'Bird'
    petStoreTest.updatePet(pet.id, pet)
    const pet2 = petStoreTest.findPet(1)
    expect(pet2).toBeInstanceOf(Pet)
    expect(pet2.id).toBe(1)
    expect(pet2.name).toBe('Crow')
    expect(pet2.tag).toBe('Bird')
  })
  it('updatePet (change petId) should throw an error', () => {
    const pet = new Pet(2, 'Crow')
    pet.tag = 'Bird'
    expect(() => petStoreTest.updatePet(1, pet)).toThrow(HttpError)
    expect(() => petStoreTest.updatePet(1, pet)).toThrow('pet id is read only')
  })
  it('deletePet (exists) should resolve', () => {
    petStoreTest.deletePet(1)
  })
  it('deletePet (not exists) should throw error', () => {
    expect(() => petStoreTest.deletePet(1)).toThrow(HttpError)
    expect(() => petStoreTest.deletePet(1)).toThrow('Not Found')
  })
})
