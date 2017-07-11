'use strict';

const hl = require('highland');
const generateFunction = require('./generate-function');
const _ = require('lodash');
const byline = require('byline');
const Promise = require('bluebird');
const pairs = [
    ['highland', hl],
    ['hl', hl],
    ['lodash', _],
    ['_', _],
    ['P', Promise],
    ['Bluebird', Promise]
];
module.exports = function(streams, code) {
    const input = streams.stdin;
    const out = streams.stdout;
    const mappingFunction = generateFunction(pairs, ['line', 'val', '$0'], code);
    return hl(byline(input))
        .map(buff => buff.toString('utf8'))
        .map(line => mappingFunction(line, line, line))
        .flatMap(toHl)
        .map(val => `${val}\n`)
        .pipe(out);
};

function toHl(val) {
    switch (typeof val) {
        case 'string':
        case 'number':
            return hl([val]);
    }

    if (Buffer.isBuffer(val)) {
        return hl([val.toString('utf8')]);
    }
    return hl(val);
}