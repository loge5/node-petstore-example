/* global jest -- injected by the jest runtime, can't be re-declared via @jest/globals in CommonJS */
const { describe, it, expect, beforeEach, afterEach } = require('@jest/globals')
const createApp = require('./app')
const PetStore = require('./lib/PetStore')
const MockDatabase = require('./lib/MockDatabase')

describe('app', () => {
  let petStore
  let server
  let baseUrl

  const request = (method, path, body) => fetch(baseUrl + path, {
    method,
    headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body)
  })
  const requestRaw = (body) => fetch(baseUrl + '/pets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  })
  const expectJson = async (response, status, body) => {
    expect(response.status).toBe(status)
    expect(await response.json()).toEqual(body)
  }
  const rex = { id: 1, name: 'Rex', tag: 'Dog' }

  beforeEach(async () => {
    jest.spyOn(console, 'warn').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
    petStore = new PetStore(new MockDatabase())
    const app = createApp({ petStore })
    server = await new Promise(resolve => { const s = app.listen(0, () => resolve(s)) })
    baseUrl = `http://127.0.0.1:${server.address().port}`
  })
  afterEach(() => {
    jest.restoreAllMocks()
    return new Promise(resolve => server.close(resolve))
  })

  it('POST /pets then GET should return the pet', async () => {
    expect((await request('POST', '/pets', rex)).status).toBe(201)
    await expectJson(await request('GET', '/pets'), 200, [rex])
    await expectJson(await request('GET', '/pets/1'), 200, rex)
  })
  it('PUT /pets/:petId should update the pet', async () => {
    await request('POST', '/pets', rex)
    expect((await request('PUT', '/pets/1', { ...rex, name: 'Max' })).status).toBe(200)
    await expectJson(await request('GET', '/pets/1'), 200, { ...rex, name: 'Max' })
  })
  it('DELETE /pets/:petId should remove the pet', async () => {
    await request('POST', '/pets', rex)
    expect((await request('DELETE', '/pets/1')).status).toBe(200)
    await expectJson(await request('GET', '/pets/1'), 404, { code: 404, message: 'Not Found' })
  })
  it('POST /pets without body should answer 400 with the validation message', async () => {
    await expectJson(await request('POST', '/pets'), 400, { code: 400, message: 'pet id should be numeric' })
  })
  it('GET /pets/:petId with invalid id should answer 400', async () => {
    await expectJson(await request('GET', '/pets/ABC'), 400, { code: 400, message: 'petId should be numeric' })
  })
  it('POST /pets (duplicate) should answer 409', async () => {
    await request('POST', '/pets', rex)
    await expectJson(await request('POST', '/pets', rex), 409, { code: 409, message: 'Conflict' })
  })
  it('unknown route should answer 404', async () => {
    await expectJson(await request('GET', '/nope'), 404, { code: 404, message: 'Not Found' })
  })
  it('POST /pets with invalid JSON should answer 400', async () => {
    const response = await requestRaw('{invalid json')
    expect(response.status).toBe(400)
    expect(await response.json()).toMatchObject({ code: 400, message: expect.stringContaining('JSON') })
  })
  it('POST /pets with a body above the limit should answer 413', async () => {
    const response = await requestRaw(JSON.stringify({ ...rex, name: 'x'.repeat(200 * 1024) }))
    await expectJson(response, 413, { code: 413, message: 'request entity too large' })
  })
  it('internal errors should not expose their message', async () => {
    petStore.findPets = () => { throw new Error('secret db details') }
    await expectJson(await request('GET', '/pets'), 500, { code: 500, message: 'Internal Server Error' })
  })
})
