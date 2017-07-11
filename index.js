'use strict';
const _ = require('lodash');
const {map, reduce, raw} = require('./lib');

module.exports = (streams, args) => {
    xorAssert(args, ['map', 'code', 'file', 'reduce']);
    if (args.map) {
        return map(streams, args.map);
    } else if (args.reduce) {
        return reduce(streams, args.reduce);
    } else {
        if (args.file) {

        }
    }
};

function xorAssert(val, properties) {
    const existentProperties = new Set();
    for(const key of properties) {
        if (_.has(val, key)) {
            existentProperties.add(key);
        }
    }
    if (existentProperties.size > 1) {
        throw new RangeError(`Only one from these arguments is allowed: ${properties.map(k => JSON.stringify(k)).join(', ')}; 
        Found: ${[...existentProperties].join(', ')}`);
    }
}