/**
 * @abstract
 */
class DatabaseInterface {
  /**
   * @abstract
   * @returns {*}
   */
  findAll () {
    throw new Error('called an abstract method')
  }

  /**
   * @abstract
   * @param {*} key
   * @returns {*}
   */
  find (key) {
    throw new Error('called an abstract method')
  }

  /**
   * @abstract
   * @param {*} key
   * @returns {boolean}
   */
  exists (key) {
    throw new Error('called an abstract method')
  }

  /**
   * @abstract
   * @param {*} key
   * @param {*} value
   */
  save (key, value) {
    throw new Error('called an abstract method')
  }

  /**
   * @abstract
   * @param {*} key
   */
  delete (key) {
    throw new Error('called an abstract method')
  }
}

module.exports = DatabaseInterface
