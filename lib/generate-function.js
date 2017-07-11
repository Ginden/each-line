'use strict';

/**
 *
 * @param {Array[]} envPairs
 * @param {string[]} functionArgs
 * @param {string} code
 */
module.exports = (envPairs, functionArgs, code) => {
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