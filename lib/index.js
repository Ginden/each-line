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
const os = require('os');

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
    ['{readFileSync, readdirSync}', fs],
    ['path', path],
    ['j', path.join],
    ['readJsonSync', (filePath) => {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    }],
    ['require', require],
    ['cwd', process.cwd()],
    ['EOL', os.EOL],
    ['os', os],
    ['tmpdir', os.tmpdir()]
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
