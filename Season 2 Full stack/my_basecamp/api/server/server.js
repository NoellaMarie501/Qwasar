const express = require('express')
const app = express();
const PORT  = 3000;

app.get('/', function(req, res){
    res.send("hello world!");
}); 



app.listen(PORT, ()=>{
    console.log(`listening on port = ${PORT}`);
});