const express = require('express')
const router = express.Router()
const asyncWrapper = require('./asyncWrapper')
const RequestParser = require('../lib/RequestParser')
const PetStore = require('../lib/PetStore')
const MockDatabase = require('../lib/MockDatabase')
const mockDatabase = new MockDatabase()

router.get('/', asyncWrapper(async (req, res) => {
  const petStore = new PetStore(mockDatabase)
  const pets = petStore.findPets()
  res.status(200).json(pets)
}))
router.post('/', asyncWrapper(async (req, res) => {
  const pet = RequestParser.parsePet(req.body)
  const petStore = new PetStore(mockDatabase)
  petStore.insertPet(pet)
  res.status(201).send()
}))
router.get('/:petId', asyncWrapper(async (req, res) => {
  const petId = RequestParser.parsePetId(req.params)
  const petStore = new PetStore(mockDatabase)
  const pets = petStore.findPet(petId)
  res.status(200).send(pets)
}))
router.put('/:petId', asyncWrapper(async (req, res) => {
  const petId = RequestParser.parsePetId(req.params)
  const pet = RequestParser.parsePet(req.body)
  const petStore = new PetStore(mockDatabase)
  petStore.updatePet(petId, pet)
  res.status(200).send()
}))
router.delete('/:petId', asyncWrapper(async (req, res) => {
  const petId = RequestParser.parsePetId(req.params)
  const petStore = new PetStore(mockDatabase)
  petStore.deletePet(petId)
  res.status(200).send()
}))
module.exports = router
