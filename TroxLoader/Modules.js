const __name = 'TroxLoader';
const __vers = 'beta';

class Modules {
  constructor () {
    this.modules = [];
  }

  /**
   * @param {object} obj 
   * @param {object} data
   * @param {string} obj.name
   * @param {string} obj.version
   * @param {string} obj.description
   * @param {object?} data.overwrites
   * @borrows obj.version as obj.vers
   * @borrows obj.description as obj.desc 
   */
  register (obj, data) {
    var name = obj.name;
    var vers = obj.version || obj.vers;
    var desc = obj.desc || obj.description || '';
    var aliases = obj.aliases;

    if (!name || !vers) throw new Error('module is missing a name or version!');
    if (!aliases) obj.aliases = [];

    delete obj['vers'];
    delete obj['desc'];

    obj.version = vers;
    obj.description = desc;

    if (data && data.overwrites) {
      obj.overwrites = data.overwrites;
    }

    console.log(
      '[%s(%s)] registered module \'%s\'',
      __name, __vers, name, obj
    );

    this.modules.push(obj);
  }

  getModules () {
    return this.modules;
  }

  getModule (name) {
    var candidate = this.modules[name];
    
    if (!candidate) {
      candidate = this.modules.find(x => {
        return x.aliases.includes(name);
      });
    }

    return candidate || null;
  }
}

module.exports = Modules;
