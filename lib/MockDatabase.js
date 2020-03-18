const DatabaseInterface = require('./DatabaseInterface')

class MockDatabase extends DatabaseInterface {
  constructor () {
    super()
    /**
     * @member {Map}
     */
    this._items = new Map()
  }

  /**
   * @returns {*}
   */
  findAll () {
    return Array.from(this._items.values())
  }

  /**
   * @param {*} key
   * @returns {*}
   */
  find (key) {
    return this._items.get(key)
  }

  /**
   * @param {*} key
   * @returns {boolean}
   */
  exists (key) {
    return this._items.has(key)
  }

  /**
   * @param {*} key
   * @param {*} value
   */
  save (key, value) {
    this._items.set(key, value)
  }

  /**
   * @param {*} key
   */
  delete (key) {
    this._items.delete(key)
  }
}

module.exports = MockDatabase
