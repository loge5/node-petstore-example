const { describe, it, expect } = require('@jest/globals')
const DatabaseInterface = require('./DatabaseInterface')

describe('DatabaseInterface', () => {
  it('should be defined', () => {
    expect(DatabaseInterface).toBeInstanceOf(Function)
  })
  it('abstract methods should throw error when not overriden', () => {
    const databaseInterface = new DatabaseInterface()
    expect(() => databaseInterface.delete()).toThrow('called an abstract method')
    expect(() => databaseInterface.exists()).toThrow('called an abstract method')
    expect(() => databaseInterface.find()).toThrow('called an abstract method')
    expect(() => databaseInterface.findAll()).toThrow('called an abstract method')
    expect(() => databaseInterface.save()).toThrow('called an abstract method')
    expect(() => databaseInterface.delete()).toThrow('called an abstract method')
  })
})
