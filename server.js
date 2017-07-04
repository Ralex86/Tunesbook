var express = require('express')
var app = express()

const publicPath = '../../../../var/www/html/'

app.use(express.static('publicPath'))

app.listen(3000, () => {
    console.log('express server is up on port 3000')
})
