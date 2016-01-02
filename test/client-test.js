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