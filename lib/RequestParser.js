const Pet = require('./Pet')
const FluentValidator = require('another-fluent-validator')
const HttpError = require('./HttpError')

class RequestParser {
  /**
   * @param {object} obj e.g express req.params object
   * @throws Error
   * @returns {number}
   */
  static parsePetId (obj) {
    return new FluentValidator(obj.petId, 'petId')
      .toInteger()
  }

  /**
   * @param {object} obj e.g express req.body object
   * @throws Error
   * @returns {Pet}
   */
  static parsePet (obj) {
    try {
      const pet = new Pet()
      pet.id = new FluentValidator(obj.id, 'pet id')
        .toInteger()
      pet.name = new FluentValidator(obj.name, 'pet name')
        .isString()
        .hasMinimumLength(1)
        .hasMaximumLength(256)
        .value
      pet.tag = new FluentValidator(obj.tag, 'pet tag')
        .isString()
        .hasMinimumLength(1)
        .hasMaximumLength(256)
        .value
      return pet
    } catch (e) {
      throw HttpError.fromError(e, 400)
    }
  }
}

module.exports = RequestParser
