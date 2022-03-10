const Game2Proxy = require('./Game2Proxy');
const Proxy2Server = require('./Proxy2Server');

class Proxy {
    constructor({ port = 25565, host = '127.0.0.1', bind }) {
        var bindingPort = +bind;
        this.g2p = new Game2Proxy(bindingPort);
        this.p2s = new Proxy2Server(port, host);
    }
}

module.exports = Proxy;