var http = require("http");

function ToastLink () {

}

ToastLink.prototype.pushToast = function (toast) {
  let fullCommand = toast;
  fullCommand.sender = 'server';

  var options = {
    hostname: '127.0.0.1',
    port: 5000,
    path: '/post',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
  };
  var request = http.request(options, function(response) {});
  let self = this;
  request.on('error', function(e) {
    self.status.connected = false;
    self.status.errorMessage = e.message;
    self.reloadConnectionStatus();
    self.initConnection();
  });
  request.write(JSON.stringify(fullCommand));
  request.end();
};
