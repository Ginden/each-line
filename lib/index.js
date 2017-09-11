'use strict';

const hl = require('highland');
const _ = require('lodash');
const cp = require('child_process');

const generateFunction = require('./generate-function');
const map = require('./map');
const filter = require('./filter');
const colors = require('colors');

const fs = require('fs');
const path = require('path');

const pairs = [
    ['highland', hl],
    ['hl', hl],
    ['lodash', _],
    ['{deburr, pad, trim, truncate, upperFirst, replace}', _],
    ['_', _],
    ['P', Promise],
    ['Bluebird', Promise],
    ['colors', colors],
    ['{execFile, execFileSync}', cp],
    ['log', (val, ...restArgs) => {
        console.error(val, ...restArgs);
        return val;
    }],
    ['shared', Object.create(null)],
    ['fs', fs],
    ['{readFileSync}', fs],
    ['path', path],
    ['j', path.join],
    ['readJsonSync', (filePath) => {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    }],
    ['require', require],

];

module.exports = {
    map(streams, code) {
        const mappingFunction = generateFunction(pairs, ['line', 'val', '$0', 'i', 'index'], code);
        return map(streams, mappingFunction);
    },
    filter(streams, code) {
        const filterFunction = generateFunction(pairs, ['line', 'val', '$0', 'i', 'index'], code);
        return filter(streams, filterFunction);
    },
    raw: () => {
        throw new Error('Not implemented yet');
    }
};