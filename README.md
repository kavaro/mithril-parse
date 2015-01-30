# mithril-parse

Parses a mithril source file and splits it into a 'pre' string (with all text before and including
'm.deps.factory = app;') and a 'post' string (with all text after 'm.deps.factory = app;').

This module allows to extend the mithril source with functionality that requires access to mithril's private variables.

mithril-iso uses this module to add isomorphic functionality to mithril. To revive a server side rendered mithril app
on the browser, mithril-iso needs to access the autoredraw, nodeCache and cellCache private variables.

Please use with extreme care ... this is really hacking mithril ...

# Usage

```
var mParse = require('mithril-parse');

// read and parse mithril source file
var parsed = mParse.load(require.resolve('mithril'));

// => { pre: '...', post: '...' }
console.log(parsed);

// extend with m.extension = "ext1"; and save to ext1-mithril.js
fs.writeFileSync('ext1-mithril.js', parsed.pre + 'm.extension = "ext1";' + parsed.post);


// read mithril source file
var mSrc = fs.readyFileSync('mithril.js', 'utf-8');

// parse the source
var parsed = mParse.parse(mSrc);

// => { pre: '...', post: '...' }
console.log(parsed);

// extend with m.extension = "ext2"; and save to ext2-mithril.js
fs.writeFileSync('ext2-mithril.js', parsed.pre + 'm.extension = "ext1";' + parsed.post);

```

# API

* parse: function(string mithrilSource)
* load: function(string mithrilSourceFilename)




