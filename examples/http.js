var connect = require('connect');
var knot = require('../');

connect.createServer(
    connect.profiler(),
    connect.query(),
    connect.bodyParser(),
    knot.connect(8000)
).listen(8080);

knot.createServer(
    knot.profiler(),
    knot.echo()
).listen(8000);