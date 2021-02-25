var express = require('express');
var helmet = require('helmet')
var app = express();
let ninetyDaysInSeconds = 90*24*60*60;

app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({action: 'deny'}));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hsts({maxAge: ninetyDaysInSeconds,force: true}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy({
  directives:{
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'","trusted-cdn.com"]
  }
}));



// app.use(helmet()) will automatically include all the middleware introduced above, except noCache(), and contentSecurityPolicy(), but these can be enabled if necessary. You can also disable or configure any other middleware individually, using a configuration object.

// Example:

// app.use(helmet({
//   frameguard: {         // configure
//     action: 'deny'
//   },
//   contentSecurityPolicy: {    // enable and configure
//     directives: {
//       defaultSrc: ["self"],
//       styleSrc: ['style.com'],
//     }
//   },
//   dnsPrefetchControl: false     // disable
// }))

















































module.exports = app;
var api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
