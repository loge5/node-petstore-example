const express = require('express')
const router = express.Router()
const RequestParser = require('../lib/RequestParser')
const PetStore = require('../lib/PetStore')
const MockDatabase = require('../lib/MockDatabase')
const petStore = new PetStore(new MockDatabase())

router.get('/', (req, res) => {
  res.status(200).json(petStore.findPets())
})
router.post('/', (req, res) => {
  petStore.insertPet(RequestParser.parsePet(req.body))
  res.status(201).send()
})
router.get('/:petId', (req, res) => {
  const petId = RequestParser.parsePetId(req.params)
  res.status(200).send(petStore.findPet(petId))
})
router.put('/:petId', (req, res) => {
  const petId = RequestParser.parsePetId(req.params)
  const pet = RequestParser.parsePet(req.body)
  petStore.updatePet(petId, pet)
  res.status(200).send()
})
router.delete('/:petId', (req, res) => {
  petStore.deletePet(RequestParser.parsePetId(req.params))
  res.status(200).send()
})
module.exports = router
