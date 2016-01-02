# inegi-denue

## Usage

``` js
var denue = require('inegi-denue')

var client = denue.createClient()

client.places(function (err, places) {
  //  Do something places
})

client.search('restaurantes', function (err, places) {
  // Do something places
})

## Tests

``` js
'env INEGI_API_TOKEN="KEY_TOKEN" npm test'


## Production
env INEGI_API_TOKEN="'KEY_TOKEN'" node
