/* eslint-disable no-unused-vars */
const Pet = require('./Pet')
const DatabaseInterface = require('./DatabaseInterface')
/* eslint-enable no-unused-vars */
const HttpError = require('./HttpError')

class PetStore {
  /**
   * @param {DatabaseInterface} database
   */
  constructor (database) {
    this._database = database
  }

  /**
   * @param {Pet} pet
   */
  insertPet (pet) {
    if (this._database.exists(pet.id)) {
      throw HttpError.fromStatus(409)
    }
    this._database.save(pet.id, pet)
  }

  /**
   * @param {number} petId
   * @param {Pet} pet
   */
  updatePet (petId, pet) {
    if (petId !== pet.id) {
      throw new HttpError('pet id is read only', 400)
    }
    this._database.save(petId, pet)
  }

  /**
   * @param {number} petId
   * @returns {Pet}
   */
  findPet (petId) {
    if (!this._database.exists(petId)) {
      throw HttpError.fromStatus(404)
    }
    return this._database.find(petId)
  }

  /**
   * @param {number} petId
   */
  deletePet (petId) {
    if (!this._database.exists(petId)) {
      throw HttpError.fromStatus(404)
    }
    this._database.delete(petId)
  }

  /**
   * @returns {Pet[]}
   */
  findPets () {
    return this._database.findAll()
  }
}

module.exports = PetStore
