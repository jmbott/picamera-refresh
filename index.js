const spawn   = require('child_process').spawn;
const express = require('express');
const app     = express();

const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname));

// app.get('/takePics', function(req, res) {
//   console.log('take pictures');
//   // console.log(req.query);
//
//   var command = spawn(__dirname + '/capture.bash');
//   var output  = [];
//
//   command.stdout.on('data', function(chunk) {
//     // console.log('stdout: ' + chunk);
//     if (chunk == 'refresh\n') {
//       console.log('refresh now');
//       io.to('main').emit('refresh');
//     }
//     output.push(chunk);
//   });
//
//   command.on('close', function(code) {
//     if (code === 0)
//       res.send(Buffer.concat(output));
//     else
//       res.send(500); // when the script fails, generate a Server Error HTTP response
//   });
// });


io.on("connection", (socket) => {
  socket.join('main');
  socket.on("takePics", (arg) => {
    console.log('take pictures');
    // console.log(arg);
    var command = spawn(__dirname + '/capture.bash');

    command.stdout.on('data', function(chunk) {
      // console.log('stdout: ' + chunk);
      if (chunk == 'refresh\n') {
        console.log('refresh now');
        io.to('main').emit('refresh');
      }
    });

    command.stderr.on('data', function(err) {
      console.log(err.toString('utf8'));
    });
  });
});

server.listen(3000);
console.log('server started on port %s', 3000);
