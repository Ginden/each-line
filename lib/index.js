'use strict';

const map = require('./map');
const reduce = require('./reduce');

module.exports = {
    map,
    reduce,
    raw: () => {
        throw new Error('Not implemented yet');
    }
};