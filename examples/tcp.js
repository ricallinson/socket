var knot = require('../');

knot.createServer(
    knot.profiler(),
    knot.echo()
).listen(8000);