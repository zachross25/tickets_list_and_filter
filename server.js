express=require('express');
constapp=express();
constpath=require('path');

var app = express();
app.use(express.static('./dist/aviasalesAngulario'));

app.listen(process.env.PORT||8080);


//PathLocationStradegy
app.get(function(req,res) {
  res.sendFile(path.join('./dist/aviasalesAngulario/index.html'));
});

console.log('Console Listening'); 
