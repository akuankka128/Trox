const tcp = require('net');

class Proxy2Server {
  constructor (port, host) {
    this.port = port;
    this.host = host;
    this.socket = null;
  }

  /**
   * `fn` may use `this` to access
   * the TCP socket 
   **/
  setSocketListener (fn) {
    this.socket = tcp.createConnection({
      port: this.port,
      host: this.host,
    }, fn.bind(this.socket));
  }
}

module.exports = Proxy2Server;
