# inegi-denue

## Tests

``` js
'env INEGI_API_TOKEN="KEY_TOKEN" npm test'
```

## Production

``` js
env INEGI_API_TOKEN="'KEY_TOKEN'" node
```

## Usage

``` js
var denue = require('inegi-denue')

var client = denue.createClient()

client.places(latitude, longitude, function (err, places) {
  //  Do something places
})

client.search('restaurantes', latitude, longitude, function (err, places) {
  // Do something places
})
```