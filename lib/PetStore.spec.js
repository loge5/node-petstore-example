const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const PetStore = require('./PetStore')
const Pet = require('./Pet')
const HttpError = require('./HttpError')
const MockDatabase = require('./MockDatabase')
const mockDatabase = new MockDatabase()
let petStoreTest

describe('PetStore', () => {
  it('should be defined', () => {
    expect(PetStore).to.be.a('Function')
  })
  it('constructor should resolve', () => {
    petStoreTest = new PetStore(mockDatabase)
  })
  it('findPets (none exists) should return array', () => {
    const pets = petStoreTest.findPets()
    expect(pets).to.be.a('Array')
    expect(pets).has.lengthOf(0)
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
    expect(() => petStoreTest.insertPet(pet)).to.throw(HttpError, 'Conflict')
  })
  it('findPets should return all Pets', () => {
    const pets = petStoreTest.findPets()
    expect(pets).to.be.a('Array')
    expect(pets).has.lengthOf(2)
  })
  it('findPet (not exists) should throw error', () => {
    expect(() => petStoreTest.findPet(3)).to.throw(HttpError, 'Not Found')
  })
  it('updatePet should store changes', () => {
    const pet = new Pet(1, 'Crow')
    pet.tag = 'Bird'
    petStoreTest.updatePet(pet.id, pet)
    const pet2 = petStoreTest.findPet(1)
    expect(pet2).to.be.instanceof(Pet)
    expect(pet2.id).equals(1)
    expect(pet2.name).equals('Crow')
    expect(pet2.tag).equals('Bird')
  })
  it('updatePet (change petId) should throw an error', () => {
    const pet = new Pet(2, 'Crow')
    pet.tag = 'Bird'
    expect(() => petStoreTest.updatePet(1, pet)).to.throw(HttpError, 'pet id is read only')
  })
  it('deletePet (exists) should resolve', () => {
    petStoreTest.deletePet(1)
  })
  it('deletePet (not exists) should throw error', () => {
    expect(() => petStoreTest.deletePet(1)).to.throw(HttpError, 'Not Found')
  })
})
