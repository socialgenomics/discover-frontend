#!/usr/bin/env node
var fs = require('fs')
var lcov2badge = require('lcov2badge');
var input = process.argv[2]
var output = process.argv[3]
lcov2badge.badge(input, function(err, svgBadge){
    if (err) throw err;
    fs.writeFileSync(output, svgBadge)
});
