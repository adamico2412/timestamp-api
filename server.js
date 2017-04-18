var strftime = require('strftime');
var express = require('express');
var app = express();

function getTimes(time) {
    var unixTime, naturalTime;
    
    if (isNaN(time.getTime())) {
        unixTime = null;
        naturalTime = null;
    } else {
        unixTime = time.getTime();
        naturalTime = strftime('%B %d, %Y', time);
    }
    
    return {
        unix: unixTime,
		natural: naturalTime
	};
}

app.get('/:date', function(req, res) {

  var date = req.params.date;

  date = Number(date) ? new Date(Number(date)) : new Date(date);
  
  res.end(JSON.stringify(getTimes(date)));
});

app.listen(8080, function(){
    console.log("listening on port 80");
});