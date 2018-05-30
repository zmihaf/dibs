const http = require('http').createServer();
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const pageVisitorInfo = {};
const userLocationInfo = {};

io.on('connection', function(socket){
  let username;
  socket.on('PAGE_VISIT', function(_newLocation, _username, _visitTimestamp){
    const oldLocation = userLocationInfo[_username];

    // Delete old entry of _username on pageVisitorInfo
    pageVisitorInfo[oldLocation] && pageVisitorInfo[oldLocation][_username] && delete pageVisitorInfo[oldLocation][_username];
    pageVisitorInfo[oldLocation] && Object.keys(pageVisitorInfo[oldLocation]).length === 0 && delete pageVisitorInfo[oldLocation];

    if (!pageVisitorInfo[_newLocation]) {
      pageVisitorInfo[_newLocation] = {};
    }
    username = _username;
    userLocationInfo[_username] = _newLocation;
    pageVisitorInfo[_newLocation][_username] = _visitTimestamp;
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
