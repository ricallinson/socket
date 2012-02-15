
/*!
 * Knot - Echo Server Example
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

var knot = require('../');

knot.createServer(
    knot.profiler(),
    knot.echo()
).listen(8000);