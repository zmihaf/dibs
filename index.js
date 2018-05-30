const http = require('http').createServer();
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const pageVisitorInfo = {};
const userLocationInfo = {};

io.on('connection', function(socket){
  let username;
  socket.on('PAGE_VISIT', function(_href, _username, _visitTimestamp){
    const href = userLocationInfo[_username];

    // Delete old entry of _username on pageVisitorInfo
    pageVisitorInfo[href] && pageVisitorInfo[href][_username] && delete pageVisitorInfo[href][_username];
    pageVisitorInfo[href] && Object.keys(pageVisitorInfo[href]).length === 0 && delete pageVisitorInfo[__href];

    if (!pageVisitorInfo[_href]) {
      pageVisitorInfo[_href] = {};
    }
    username = _username;
    userLocationInfo[_username] = _href;
    pageVisitorInfo[_href][_username] = _visitTimestamp;
    io.emit('PAGEVISITORINFO_UPDATE', pageVisitorInfo);
  });
  socket.on('disconnect', function() {
    const href = userLocationInfo[username];

    // Delete old entry of _username on pageVisitorInfo
    pageVisitorInfo[href] && pageVisitorInfo[href][username] && delete pageVisitorInfo[href][username];
    pageVisitorInfo[href] && Object.keys(pageVisitorInfo[href]).length === 0 && delete pageVisitorInfo[href];

    userLocationInfo[username] && delete userLocationInfo[username];
    io.emit('PAGEVISITORINFO_UPDATE', pageVisitorInfo);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
