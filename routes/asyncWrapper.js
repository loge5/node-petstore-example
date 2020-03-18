/**
 * Use this function to wrap async-routes like this:
 *
 * router.get('/', asyncWrapper(async (req, res) => { ...
 *
 * Without this errors thrown in an async context
 * won't be catched by the global error hanlder (@see index.js)
 */
const asyncWrapper = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next)
  }
module.exports = asyncWrapper
