# inegi-denue
_NodeJs module to serve JSON data from INEGI DENUE API, a 'KEY TOKEN' is required_
> site: http://www.beta.inegi.org.mx/servicios/api_denue.html

## Installation

``` js
npm install inegi-denue --save
```

## Usage

``` js
var denue = require('inegi-denue')

var client = denue.createClient()

client.places(latitude, longitude, function (err, places) {
  //  Do something places
})

client.places(latitude, longitude, {close: 1500}, function (err, places) {
  // Find all places around 1,500 meters
})

client.search('restaurantes', latitude, longitude, function (err, places) {
  // Do something places
})

client.search('restaurantes', latitude, longitude, {close: 5000} function (err, places) {
  // Search 'restaurantes' in a 5000 meters radio
})
```

## Tests

``` js
'env INEGI_API_TOKEN="KEY_TOKEN" npm test'
```
'KEY_TOKEN' is exactly that String for test Only (using nock)

### Coverage
``` js
env INEGI_API_TOKEN="KEY_TOKEN" npm run coverage
```

## Production

``` js
env INEGI_API_TOKEN="'KEY_TOKEN'" node
```
'KEY_TOKEN' is a *Required* String
> get it from: http://www.inegi.org.mx/desarrolladores/denue/apidenue.aspx
