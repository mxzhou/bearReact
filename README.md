bearReact

node-module

1.ansi-html /inde.js

require('es5-shim')

// 修改前
ansiHTML.tags = {
  get open() {
    return _openTags;
  },
  get close() {
    return _closeTags;
  }
};

// 修改后

ansiHTML.tags = {
  open:  _openTags,
  close: _closeTags
};

2.core-js  /modules/_object-cp.js
library/modules/_object-cp.js
// 修改前
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');

// 修改后
if('get' in Attributes || 'set' in Attributes){
    try {
      throw new TypeError('Accessors not supported!');
    }
    catch (e) {
    }
  }

3.webpack-hot-middleware  /client-overlay.js
// 修改前

for (var key in styles) {
  clientOverlay.style[key] = styles[key];
}

// 修改后

var cssText = []
for (var key in styles) {
  cssText.push(key+':'+styles[key])
}
clientOverlay.style.cssText = cssText.join(',')

