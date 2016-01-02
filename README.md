# inegi-denue
_NodeJs module to serve JSON data from INEGI DENUE API, a 'KEY TOKEN' is required_
> site: http://www.beta.inegi.org.mx/servicios/api_denue.html

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