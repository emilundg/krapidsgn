const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
var sslRedirect = require('heroku-ssl-redirect');

// create the express app
const app = express()

app.use(sslRedirect());

var apiRouter = express.Router()

apiRouter.get('/postmaster/:name/:email/:message', (req, res, next) => {
    var apiKey = 'key-d3b5ee1965da4ee91df34f25693c9d31'
    var domain = 'sandbox2f72beb589cd46e78ebff2f5ea6ad23b.mailgun.org'
    var mailgun = require('mailgun-js')({
        apiKey: apiKey,
        domain: domain
    })

    var data = {
        from: 'Excited Customer <postmaster@sandbox2f72beb589cd46e78ebff2f5ea6ad23b.mailgun.org>',
        to: 'emil.lundgren@krapidsgn.com',
        subject: 'from customer: ' + req.params.name + ' with email: ' + req.params.email,
        text: req.params.message
    }

    mailgun.messages().send(data, function (error, body) {
        if (error) {
            console.log(error)
        }
    })
    res.status(200);
    res.send('Gj m8');
})

app.get('/.well-known/acme-challenge/M1rI6K6FCG4zZUeyn_oDO1gQmr-fd9vrtf7oazKJp1s', function(req, res) {
    res.send('M1rI6K6FCG4zZUeyn_oDO1gQmr-fd9vrtf7oazKJp1s.qmn5ogFW6AYmmbnfD9Mmd5HC58II9i9--DIgM2srvmw')
})

// create middleware to handle the serving the app
app.use("/", serveStatic(path.join(__dirname, '/dist')))

// Add API api-router.
app.use('/api', apiRouter)

// Catch all routes and redirect to the index file
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

// Create default port to serve the app on
const port = process.env.PORT || 5000
app.listen(port)
// Log to feedback that this is actually running
console.log('Server started on port ' + port)