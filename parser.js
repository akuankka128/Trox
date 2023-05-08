const BufferReader = require('buffer-reader');
const TroxLoader = require('./TroxLoader');
const path = require('path');

module.exports = {
  parse
}

var folder = path.resolve('modules/');
var loader = new TroxLoader(folder);
var handlers = {};
loader.load();

loader.modules.getModules().forEach(module => {
  if (module.overwrites) {
    var keys = Object.keys(module.overwrites);
    for (var key of keys) {
      handlers[key] = module.overwrites[key]
    }
  }
});

function parse (data, origin, port, sockets) {
  var reader = new BufferReader(data);
  var length = reader.nextUInt16LE();
  var packetId = reader.nextUInt8();

  if (handlers[packetId]) {
    // Include length & packet ID
    reader.seek(0);

    handlers[packetId](
      reader,
      origin,
      port,
      sockets,
    );
  }
}
