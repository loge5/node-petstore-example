const express = require('express')
const RequestParser = require('../lib/RequestParser')

/**
 * @param {import('../lib/PetStore')} petStore
 * @returns {import('express').Router}
 */
const petsRouter = petStore => {
  const router = express.Router()
  router.get('/', (req, res) => {
    res.json(petStore.findPets())
  })
  router.post('/', (req, res) => {
    petStore.insertPet(RequestParser.parsePet(req.body))
    res.status(201).send()
  })
  router.get('/:petId', (req, res) => {
    res.json(petStore.findPet(RequestParser.parsePetId(req.params)))
  })
  router.put('/:petId', (req, res) => {
    const petId = RequestParser.parsePetId(req.params)
    const pet = RequestParser.parsePet(req.body)
    petStore.updatePet(petId, pet)
    res.send()
  })
  router.delete('/:petId', (req, res) => {
    petStore.deletePet(RequestParser.parsePetId(req.params))
    res.send()
  })
  return router
}

module.exports = petsRouter
