
/*!
 * Knot - Nxxx Time Protocol Server Example
 * Copyright(c) 2012 RS Allinson
 * MIT Licensed
 */

var knot = require('../');

knot.createServer(
    {term:''},
    knot.profiler(),
    knot.ntp()
).listen(1024);