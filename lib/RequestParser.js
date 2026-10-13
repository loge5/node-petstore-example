const Pet = require('./Pet')
const FluentValidator = require('another-fluent-validator')
const HttpError = require('./HttpError')

/**
 * Validation errors are client errors: rethrow them as 400 Bad Request
 * @template T
 * @param {() => T} validate
 * @returns {T}
 */
const asBadRequest = validate => {
  try {
    return validate()
  } catch (e) {
    throw HttpError.fromError(e, 400)
  }
}

class RequestParser {
  /**
   * @param {object} obj e.g express req.params object
   * @throws HttpError
   * @returns {number}
   */
  static parsePetId (obj = {}) {
    return asBadRequest(() => new FluentValidator(obj.petId, 'petId')
      .toInteger())
  }

  /**
   * @param {object} obj e.g express req.body object (undefined without body since express 5)
   * @throws HttpError
   * @returns {Pet}
   */
  static parsePet (obj = {}) {
    return asBadRequest(() => {
      const id = new FluentValidator(obj.id, 'pet id')
        .toInteger()
      const name = new FluentValidator(obj.name, 'pet name')
        .isString()
        .hasMinimumLength(1)
        .hasMaximumLength(256)
        .value
      const pet = new Pet(id, name)
      pet.tag = new FluentValidator(obj.tag, 'pet tag')
        .isString()
        .hasMinimumLength(1)
        .hasMaximumLength(256)
        .value
      return pet
    })
  }
}

module.exports = RequestParser
