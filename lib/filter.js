'use strict';

const hl = require('highland');
const byline = require('byline');
const Promise = require('bluebird');
const lineTerminator = require('os').EOL;

module.exports = function (streams, filteringFunction) {
    const input = streams.stdin;
    const out = streams.stdout;
    let i = 0;

    return hl(byline(input))
        .map(buff => buff.toString('utf8'))
        .filter(line => {
            try {
                return filteringFunction(line, line, line, i, i);
            } finally {
                i += 1;
            }
        })
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