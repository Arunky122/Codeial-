const express = require('express');
const app = express();
const port = 8002;


app.listen(port,function(err){
    if(err){
        console.log(`Eror in running the server:${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});