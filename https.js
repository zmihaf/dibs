// const port = process.env.PORT || 443;
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('key.key'),
//   cert: fs.readFileSync('crt.crt'),
// };

// const https = require('https').createServer(options);
// const io = require('socket.io').listen(https);
// const httpProxy = require('http-proxy');
// const proxy = httpProxy.createProxyServer();

// const pageVisitorInfo = {};

// io.on('connection', function(socket){
//   console.log('CONNECTION')
//   let href, username;
//   socket.on('PAGE_VISIT', function(_href, _username, visitTimestamp){
//     console.log('VISIT', _username)
//     href && username && delete pageVisitorInfo[href][username];
//     username = _username;
//     href = _href;
//     if (!pageVisitorInfo[href]) {
//       pageVisitorInfo[href] = {};
//     }
//     pageVisitorInfo[href][username] = visitTimestamp;
//     io.emit('PAGEVISITORINFO_UPDATE', pageVisitorInfo);
//     console.log(pageVisitorInfo)
//   });
//   socket.on('disconnect', function() {
//     console.log('DISCONNECT', username)
//     pageVisitorInfo[href] && delete pageVisitorInfo[href][username];
//     io.emit('PAGEVISITORINFO_UPDATE', pageVisitorInfo);
//     console.log(pageVisitorInfo)
//   });
// });

// https.listen(port, function(){
//   https.on('request', (req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' });
//   });
// });
