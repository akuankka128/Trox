const tcp = require('net');

class Game2Proxy {
  constructor (port) {
    this.port = port;
    this.host = '127.0.0.1';
    this.socket = null;
    this.connection = null;
  }

  setSocketListener (fn) {
    this.socket = tcp.createServer(fn);
    this.socket.listen({
      port: this.port,
      host: this.host,
    });
  }
}

module.exports = Game2Proxy;
