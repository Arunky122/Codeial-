const express = require('express');
const app = express();
const port = 8002;

//use express router

app.use('/',require('./routes'));
//Setup view engine
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Eror in running the server:${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});