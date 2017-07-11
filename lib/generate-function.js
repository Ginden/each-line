'use strict';
const assert = require('assert');
/**
 *
 * @param {Array[]} envPairs
 * @param {string[]} functionArgs
 * @param {string} code
 */
module.exports = (envPairs, functionArgs, code) => {
    assert.equal(typeof code, 'string', 'Code have to be a string');
    assert(Array.isArray(envPairs), 'envPairs have to be an array');
    assert(Array.isArray(functionArgs), 'function arguments have to be an array');
    const insideFunction = tryArrowLikeAndNormal(functionArgs, code);
    const envNames = envPairs.map(([k]) => k);
    const envParams = envPairs.map(([,v]) => v);
    return Function(...envNames, `return (${insideFunction.toString()})`)(...envParams);
};

function tryArrowLikeAndNormal(functionArgs, code) {
    try {
        return Function(...functionArgs, `return (${code});`)
    } catch(err) {
        return Function(...functionArgs, code);
    }
}