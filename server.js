var strftime = require('strftime');
var express = require('express');
var path = require('path');
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

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "html");
app.engine('html', require('ejs').renderFile);

app.get('/', function(req, res){
    res.render('index');
});

app.get('/:date', function(req, res) {

  var date = req.params.date;

  date = Number(date) ? new Date(Number(date)) : new Date(date);
  
  res.end(JSON.stringify(getTimes(date)));
});

app.listen(process.env.PORT || 8080, function(){
    console.log("listening on port 8080");
});