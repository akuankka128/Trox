const Proxy = require('./Proxy');
const parser = require('./parser');
const params = require('./params');

var {
  port,
  host,
  bind,
} = params.parseNamed(process.argv.slice(2), false);

bind = bind || '7777';

var proxy = new Proxy({
  port: +port,
  host: host,
  bind: bind,
});

proxy.g2p.setSocketListener(function (connection) {
  proxy.g2p.connection = connection;
  var intermediary = {
    writeClient: null,
    writeServer: null,
  };

  connection.on('data', x => {
    parser.parse(
      x, 'client',
      proxy.g2p.port,
      intermediary
    );

    proxy.p2s.socket.write(x);
  });

  proxy.p2s.setSocketListener(function() {
    var conn = proxy.g2p.connection;
    var serv = proxy.p2s.socket;
    intermediary = {
      writeClient: conn.write.bind(conn),
      writeServer: serv.write.bind(serv),
    };

    proxy.p2s.socket.on('data', x => {
      parser.parse(
        x, 'server',
        proxy.p2s.port,
        intermediary
      );

      proxy.g2p.connection.write(x);
    });
  });

  proxy.g2p.connection.setNoDelay(true);
  proxy.p2s.socket.setNoDelay(true);
});
