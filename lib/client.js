var request = require('client-request')

function Client (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'http://www3.inegi.org.mx'
  this.category = this.options.category || 'todos'
  this.close = this.options.close || 1500
  this.key = process.env.INEGI_API_TOKEN
}

Client.prototype._request = function (position, method, params, callback) {
  var uri = this.endpoint + '/sistemas/api/denue/v1/consulta/buscar/' + this.category + '/' + position + '/' + this.close + '/' + this.key

  request({
    uri: uri,
    method: method,
    json: true
  }, function (err, res, body) {
    if (err) return callback(err)

    if (res.statusCode !== 200) return callback(new Error('An error ocurred in the request'))

    callback(null, body)
  })
}

Client.prototype.places = function (latitude, longitude, callback) {
  var position = latitude + ',' + longitude
  this._request(position, 'GET', null, callback)
}

Client.prototype.search = function (place, latitude, longitude, callback) {
  this.category = place
  var position = latitude + ',' + longitude
  this._request(position, 'GET', null, callback)
}

module.exports = Client
