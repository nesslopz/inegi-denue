var test = require('tape')
var nock = require('nock')
var denue = require('../')
var Client = require('../lib/client')

var endpoint = 'http://www3.inegi.test'

test('should create a client', function (t) {
  t.ok(denue.createClient, 'should exist')
  t.equals(typeof denue.createClient, 'function', 'should be a function')

  var client = denue.createClient()
  t.ok(client instanceof Client, 'should be instance of client')

  t.end()
})

test('should fail with unknown endpoint', function (t) {
  var client = denue.createClient({ endpoint: endpoint })

  nock(endpoint)
    .get('/foo')
    .reply(404)

  client._request('123,123', 'GET', function (err, body) {
    t.ok(err, 'should fail')
    t.end()
  })
})

test('should fail if not query is passed', function (t) {
  var client = denue.createClient({ endpoint: endpoint })

  nock(endpoint)
    .get('/sistemas/api/denue/v1/consulta/buscar//123,123/1500/KEY_TOKEN')
    .reply(400, {
      code: 0,
      message: 'Missing required parameter to search',
      name: 'Bad request',
      status: 400
    })

  client.search('', 123, 123, function (err, res) {
    t.ok(err, 'bad request error')
    t.notOk(res, 'should be null')
    t.end()
  })
})

test('should list places', function (t) {
  var client = denue.createClient({ endpoint: endpoint })

  t.equals(typeof client.places, 'function', 'should be a function')

  nock(endpoint)
    .get('/sistemas/api/denue/v1/consulta/buscar/todos/123,123/1500/KEY_TOKEN')
    .reply(200, [])

  client.places(123, 123, function (err, places) {
    t.error(err, 'should be not an error')
    t.ok(Array.isArray(places), 'should be an array')
    t.end()
  })
})

test('should search places', function (t) {
  var client = denue.createClient({ endpoint: endpoint })

  t.equals(typeof client.search, 'function', 'should be a function')

  nock(endpoint)
    .get('/sistemas/api/denue/v1/consulta/buscar/restaurantes/123,123/1500/KEY_TOKEN')
    .reply(200, [{Nombre: 'Restaurante'}])

  client.search('restaurantes', 123, 123, function (err, places) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(places), 'should be an array')
    t.equals(places[0].Nombre, 'Restaurante', 'should retrieve a place Name')
  })

  t.end()
})

test('should search places with diferent radio', function (t) {
  var client = denue.createClient({ endpoint: endpoint })

  t.equals(typeof client.search, 'function', 'should be a function')

  nock(endpoint)
    .get('/sistemas/api/denue/v1/consulta/buscar/restaurantes/123,123/5000/KEY_TOKEN')
    .reply(200, [{Nombre: 'Restaurante'}])

  client.search('restaurantes', 123, 123, { close: 5000 }, function (err, places) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(places), 'should be an array')
    t.equals(places[0].Nombre, 'Restaurante', 'should retrieve a place Name')
  })

  t.end()
})
