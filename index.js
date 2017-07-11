'use strict';
const _ = require('lodash');
const {map, filter} = require('./lib');

module.exports = (streams, args) => {
    xorAssert(args, ['map', 'file', 'filter']);

    if (args.map) {
        return map(streams, args.map);
    } else if (args.filter) {
        return filter(streams, args.filter);
    } else {
        throw new Error('TODO: add support for script files');
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