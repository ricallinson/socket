var connect = require('connect');
var knot = require('../');

connect.createServer(
    connect.profiler(),
    connect.query(),
    connect.bodyParser(),
    knot.connect(8000)
).listen(8080);