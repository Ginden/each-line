'use strict';

const hl = require('highland');
const byline = require('byline');
const Promise = require('bluebird');
const lineTerminator = require('os').EOL;

module.exports = function(streams, mappingFunction) {
    const input = streams.stdin;
    const out = streams.stdout;
    let i = 0;

    return hl(byline(input))
        .map(buff => buff.toString('utf8'))
        .map(line => {
            try {
                return mappingFunction(line, line, line, i, i);
            } finally {
                i += 1;
            }
        })
        .filter(v => !(v === null || v === undefined))
        .flatMap(toHl)
        .map(val => `${val}${lineTerminator}`)
        .pipe(out);
};

function toHl(val) {
    if (Buffer.isBuffer(val)) {
        return hl([val.toString('utf8')]);
    }
    if (hl.isStream(val)) {
        return hl(val);
    }
    return hl(Promise.resolve(val));
}