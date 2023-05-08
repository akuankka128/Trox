const {
  readdirSync: directory
} = require('fs');

const path = require('path');
const Modules = require('./Modules.js');

class TroxLoader {
  constructor (path) {
    this.path = path;
    this.modules = new Modules();
    // this.config = {
    // 	'strict-warnings': true,
    // };
  }

  load (what) {
    var dire = what || this.path;
    var files = directory(dire);

    files.forEach(x => {
      var resolve = path.join(dire, x);
      var module = require(resolve);

      if (typeof module === 'function') {
        module(this.modules);
      }
    });
  }
}

module.exports = TroxLoader;
