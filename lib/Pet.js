class Pet {
  /**
   * @param {number} id 
   * @param {string} name 
   */
  constructor (id, name) {
    /**
     * @member {number}
     */
    this.id = id
    /**
     * @member {string}
     */
    this.name = name
    /**
     * @member {string}
     */
    this.tag = undefined
  }
}

module.exports = Pet
