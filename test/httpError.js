const { expect } = require('@jest/globals')

/**
 * Matcher for a thrown HttpError, e.g. `expect(fn).toThrow(httpError(404, 'Not Found'))`
 * @param {number} status
 * @param {string} message
 */
const httpError = (status, message) => expect.objectContaining({ status, message })

module.exports = httpError
