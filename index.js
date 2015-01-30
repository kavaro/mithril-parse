/**
 * Created by karl on 30/1/15.
 */

var fs = require('fs');

function parse(mFile, mFactory) {
    var mFactorPrefix = mFile.slice(0, mFile.match(/function\sapp\(/).index);
    var mFactorPostfix = mFile.slice(mFactorPrefix.length + mFactory.length);
    var mDepsFactory = mFactory.match(/m\s*\.\s*deps\s*\.\s*factory\s*=\s*app\s*;\s*\n/);
    var mDepsFactoryEnd = mDepsFactory.index + mDepsFactory[0].length;
    var mDepsFactoryPrefix = mFactory.slice(0, mDepsFactoryEnd);
    var mDepsFactoryPostfix = mFactory.slice(mDepsFactoryEnd);
    return {
        pre: mFactorPrefix + mDepsFactoryPrefix,
        post: mDepsFactoryPostfix + mFactorPostfix
    };
}

function load(mPath) {
    var mFile = fs.readFileSync(mPath, 'utf-8');
    var mFactory = require(mPath).deps.factory.toString();
    return parse(mFile, mFactory);
}

module.exports = {
    parse: parse,
    load: load
};